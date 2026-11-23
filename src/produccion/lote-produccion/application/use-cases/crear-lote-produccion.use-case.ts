import { BadRequestException, Injectable } from "@nestjs/common";
import { LoteProduccionRepositoryPort } from "../ports/lote-produccion.repository.port";
import { CrearLoteProduccionDto } from "../dto/crear-lote-produccion.dto";
import { LoteProduccion } from "../../domain/entities/lote-produccion.entity";
import { ActividadRepositoryPort } from "../../../actividad/application/ports/actividad.repository.port";
import { MovimientoProduccionRepositoryPort } from "../../../movimiento-produccion/application/ports/movimiento-produccion.repository.port";
import { MovimientoProduccion } from "../../../movimiento-produccion/domain/entities/movimiento-produccion.entity";

@Injectable()
export class CrearLoteProduccionUseCase {
  constructor(
    private readonly loteProduccionRepository: LoteProduccionRepositoryPort,
    private readonly actividadRepository: ActividadRepositoryPort,
    private readonly movimientoProduccionRepository: MovimientoProduccionRepositoryPort,
  ) {}

  async execute(dto: CrearLoteProduccionDto): Promise<LoteProduccion> {
    const datos = await this.completarDesdeCosecha(dto);

    const nuevo = new LoteProduccion();
    Object.assign(nuevo, datos);
    nuevo.stockDisponibleKg = datos.stockDisponibleKg ?? datos.cantidadKg;

    const guardado = await this.loteProduccionRepository.save(nuevo);

    // Registro inicial de entrada. No descuenta stock: el lote ya nace con él.
    const entrada = new MovimientoProduccion();
    Object.assign(entrada, {
      loteProduccionId: guardado.id,
      tipo: "entrada",
      cantidadKg: guardado.cantidadKg,
      costoUnitarioKg: guardado.costoUnitarioKg,
      costoTotal: guardado.costoTotal,
      descripcion: dto.actividadCosechaId
        ? `Cosecha - actividad #${dto.actividadCosechaId}`
        : "Registro inicial del lote de producción",
      fecha: new Date(),
    });
    await this.movimientoProduccionRepository.save(entrada);

    return guardado;
  }

  // Si el lote viene de una actividad de cosecha, toma sus datos y
  // completa los que el cliente no haya enviado.
  private async completarDesdeCosecha(
    dto: CrearLoteProduccionDto,
  ): Promise<CrearLoteProduccionDto & { cultivoId: number; loteId: number; cantidadKg: number }> {
    let datos = { ...dto };

    if (dto.actividadCosechaId) {
      const actividad = await this.actividadRepository.findById(
        dto.actividadCosechaId,
      );
      if (!actividad) {
        throw new BadRequestException("La actividad de cosecha no existe");
      }

      datos = {
        ...datos,
        cultivoId: dto.cultivoId ?? actividad.cultivoId,
        loteId: dto.loteId ?? actividad.loteId,
        subLoteId: dto.subLoteId ?? actividad.subLoteId ?? undefined,
        productoAgroId: dto.productoAgroId ?? actividad.productoAgroId ?? undefined,
        cantidadKg: dto.cantidadKg ?? actividad.kgRecolectados ?? undefined,
      };
    }

    if (datos.cultivoId == null || datos.loteId == null || datos.cantidadKg == null) {
      throw new BadRequestException(
        "cultivoId, loteId y cantidadKg son obligatorios (o envía actividadCosechaId con kgRecolectados)",
      );
    }

    return datos as CrearLoteProduccionDto & { cultivoId: number; loteId: number; cantidadKg: number };
  }
}
