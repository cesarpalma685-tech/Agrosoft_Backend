import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { LoteProduccionRepositoryPort } from "../ports/lote-produccion.repository.port";
import { ActualizarLoteProduccionDto } from "../dto/crear-lote-produccion.dto";
import { LoteProduccion } from "../../domain/entities/lote-produccion.entity";
import { MovimientoProduccionRepositoryPort } from "../../../movimiento-produccion/application/ports/movimiento-produccion.repository.port";
import { MovimientoProduccion } from "../../../movimiento-produccion/domain/entities/movimiento-produccion.entity";

const redondear = (valor: number) => Math.round((valor + Number.EPSILON) * 100) / 100;

@Injectable()
export class ActualizarLoteProduccionUseCase {
  constructor(
    private readonly repository: LoteProduccionRepositoryPort,
    private readonly movimientos: MovimientoProduccionRepositoryPort,
  ) {}

  async execute(id: number, dto: ActualizarLoteProduccionDto, usuarioId: number): Promise<LoteProduccion> {
    const actual = await this.repository.findById(id);
    if (!actual) throw new NotFoundException(`La cosecha con ID ${id} no existe`);

    const cambios: Partial<LoteProduccion> = {};
    if (dto.calidad !== undefined) cambios.calidad = dto.calidad;
    if (dto.fechaCosecha !== undefined) cambios.fechaCosecha = dto.fechaCosecha.slice(0, 10);
    if (dto.responsable !== undefined) cambios.responsable = dto.responsable.trim() || null;
    if (dto.observaciones !== undefined) cambios.observaciones = dto.observaciones.trim() || null;
    if (dto.precioSugeridoKg !== undefined) cambios.precioSugeridoKg = dto.precioSugeridoKg;

    // Cambiar los kg corrige el stock, sin bajar de lo que ya se vendió (RF7.5)
    if (dto.cantidadKg !== undefined && dto.cantidadKg !== actual.cantidadKg) {
      const vendido = actual.cantidadKg - actual.stockDisponibleKg;
      if (dto.cantidadKg < vendido) {
        throw new BadRequestException(`Ya se vendieron ${vendido} kg de esta cosecha: no puede quedar en ${dto.cantidadKg} kg`);
      }
      cambios.cantidadKg = dto.cantidadKg;
      cambios.stockDisponibleKg = redondear(dto.cantidadKg - vendido);
      cambios.costoUnitarioKg = redondear(Number(actual.costoTotal ?? 0) / dto.cantidadKg);

      const ajuste = new MovimientoProduccion();
      Object.assign(ajuste, {
        loteProduccionId: id,
        tipo: "ajuste",
        cantidadKg: redondear(dto.cantidadKg - actual.cantidadKg),
        descripcion: `Corrección de la cosecha: ${actual.cantidadKg} kg → ${dto.cantidadKg} kg`,
        usuarioId,
        fecha: new Date(),
      });
      await this.movimientos.save(ajuste);
    }

    const actualizado = await this.repository.update(id, cambios);
    if (!actualizado) throw new NotFoundException(`No se pudo actualizar la cosecha con ID ${id}`);
    return actualizado;
  }
}
