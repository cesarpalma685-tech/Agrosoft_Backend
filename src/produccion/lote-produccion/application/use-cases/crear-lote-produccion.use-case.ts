import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { LoteProduccionRepositoryPort } from "../ports/lote-produccion.repository.port";
import { CrearLoteProduccionDto } from "../dto/crear-lote-produccion.dto";
import { LoteProduccion } from "../../domain/entities/lote-produccion.entity";
import { CultivoRepositoryPort } from "../../../cultivo/application/ports/cultivo.repository.port";
import { MovimientoProduccionRepositoryPort } from "../../../movimiento-produccion/application/ports/movimiento-produccion.repository.port";
import { MovimientoProduccion } from "../../../movimiento-produccion/domain/entities/movimiento-produccion.entity";
import { ProductosAgroRepositoryPort } from "../../../../catalogos/productos_agro/application/ports/productos_agro-repository.port";

const redondear = (valor: number) => Math.round((valor + Number.EPSILON) * 100) / 100;

@Injectable()
export class CrearLoteProduccionUseCase {
  constructor(
    private readonly loteProduccionRepository: LoteProduccionRepositoryPort,
    private readonly cultivoRepository: CultivoRepositoryPort,
    private readonly movimientoProduccionRepository: MovimientoProduccionRepositoryPort,
    private readonly productosRepository: ProductosAgroRepositoryPort,
  ) {}

  async execute(dto: CrearLoteProduccionDto, usuarioId: number): Promise<LoteProduccion> {
    const cultivo = await this.cultivoRepository.findById(dto.cultivoId);
    if (!cultivo) throw new NotFoundException(`El cultivo con ID ${dto.cultivoId} no existe`);
    if (cultivo.estado === "cancelado") throw new BadRequestException("No se puede registrar una cosecha de un cultivo cancelado");

    // Costo del lote = lo acumulado por el cultivo que aún no se ha repartido entre cosechas anteriores (RF7.3)
    const anteriores = await this.loteProduccionRepository.findByCultivoId(cultivo.id);
    const yaRepartido = anteriores.reduce((suma, l) => suma + Number(l.costoTotal ?? 0), 0);
    const costoTotal = redondear(Math.max(0, Number(cultivo.costoTotal ?? 0) - yaRepartido));

    const nuevo = new LoteProduccion();
    Object.assign(nuevo, {
      productoAgroId: dto.productoAgroId ?? (await this.productoDelCultivo(cultivo.nombreCultivo)),
      cultivoId: cultivo.id,
      loteId: dto.loteId ?? cultivo.loteId,
      subLoteId: dto.subLoteId ?? cultivo.subloteId ?? undefined,
      actividadCosechaId: dto.actividadCosechaId,
      calidad: dto.calidad ?? "buena",
      fechaCosecha: dto.fechaCosecha?.slice(0, 10) ?? new Date().toISOString().slice(0, 10),
      responsable: dto.responsable?.trim() || null,
      observaciones: dto.observaciones?.trim() || null,
      creadoPorUsuarioId: usuarioId,
      cantidadKg: dto.cantidadKg,
      stockDisponibleKg: dto.cantidadKg,
      costoTotal,
      costoUnitarioKg: redondear(costoTotal / dto.cantidadKg),
      precioSugeridoKg: dto.precioSugeridoKg,
    });
    const guardado = await this.loteProduccionRepository.save(nuevo);

    // Registro inicial de entrada. No descuenta stock: el lote ya nace con él.
    const entrada = new MovimientoProduccion();
    Object.assign(entrada, {
      loteProduccionId: guardado.id,
      tipo: "entrada",
      cantidadKg: guardado.cantidadKg,
      costoUnitarioKg: guardado.costoUnitarioKg,
      costoTotal: guardado.costoTotal,
      descripcion: dto.actividadCosechaId ? `Cosecha - actividad #${dto.actividadCosechaId}` : "Cosecha registrada",
      usuarioId,
      fecha: new Date(),
    });
    await this.movimientoProduccionRepository.save(entrada);

    return guardado;
  }

  /** Producto del catálogo con el nombre del cultivo; se crea la primera vez. */
  private async productoDelCultivo(nombre: string): Promise<number | undefined> {
    const existentes = await this.productosRepository.listar();
    const igual = existentes.find((p) => p.nombre.trim().toLowerCase() === nombre.trim().toLowerCase());
    if (igual) return igual.id;
    const creado = await this.productosRepository.crear({ nombre, unidadBase: "kg", descripcion: `Producto cosechado: ${nombre}` } as never);
    return creado.id;
  }
}
