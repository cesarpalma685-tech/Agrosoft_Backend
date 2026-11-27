import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { MovimientoInsumoRepositoryPort } from "../ports/crear-movimiento-insumo.repository.port";
import { InsumoRepositoryPort } from "../../../insumos/application/ports/insumo.repository.port";
import { CrearMovimientoIsumoDto } from "../dto/crear-movimiento-insumo.dto";
import { MovimientoInsumo } from "../../domain/entities/movimiento-insumo.entity";
import { TipoMovimientoInsumoEnum } from "../../domain/enum/tipo-movimiento-insumo.enum";

const redondear = (valor: number) => Math.round((valor + Number.EPSILON) * 100) / 100;

@Injectable()
export class RegistrarMovimientoInsumoUseCase {
  constructor(
    private readonly movimientoRepository: MovimientoInsumoRepositoryPort,
    private readonly insumoRepository: InsumoRepositoryPort,
  ) {}

  async execute(dto: CrearMovimientoIsumoDto, usuarioId: number): Promise<MovimientoInsumo> {
    const insumo = await this.insumoRepository.findById(dto.insumoId);
    if (!insumo) throw new NotFoundException(`El insumo con ID ${dto.insumoId} no existe`);

    const factor = Number(insumo.factorConversionUso) || 1;
    const stockPresentacion = Number(insumo.stockPresentacion);
    const reservadoPresentacion = Number(insumo.stockReservado) / factor;
    const precioUso = Number(insumo.precioUnitarioUso);

    let nuevoStock = stockPresentacion;
    let almacenId: number | undefined;

    switch (dto.tipo) {
      case TipoMovimientoInsumoEnum.ENTRADA:
        nuevoStock = stockPresentacion + dto.cantidadPresentacion;
        break;
      case TipoMovimientoInsumoEnum.SALIDA:
        // Lo reservado para actividades no está disponible (RF6.5)
        if (dto.cantidadPresentacion > stockPresentacion - reservadoPresentacion) {
          throw new BadRequestException("No hay stock disponible suficiente para esta salida");
        }
        nuevoStock = stockPresentacion - dto.cantidadPresentacion;
        break;
      case TipoMovimientoInsumoEnum.AJUSTE:
        nuevoStock = dto.cantidadPresentacion;
        break;
      case TipoMovimientoInsumoEnum.TRASLADO:
        if (!dto.almacenDestinoId) throw new BadRequestException("El traslado necesita un almacén de destino");
        if (dto.cantidadPresentacion > stockPresentacion) {
          throw new BadRequestException("No hay stock suficiente para este traslado");
        }
        almacenId = dto.almacenDestinoId;
        break;
    }

    const stockUso = redondear(nuevoStock * factor);
    const valorInventario = redondear(stockUso * precioUso);
    const costoPresentacion = dto.costoUnitarioPresentacion ?? Number(insumo.precioUnitarioPresentacion);

    const movimiento = new MovimientoInsumo();
    Object.assign(movimiento, {
      ...dto,
      usuarioId,
      cantidadUso: redondear(dto.cantidadPresentacion * factor),
      costoUnitarioPresentacion: costoPresentacion,
      costoUnitarioUso: redondear(costoPresentacion / factor),
      costoTotal: redondear(dto.cantidadPresentacion * costoPresentacion),
      valorInventarioResultante: valorInventario,
    });

    // Primero el movimiento (queda el rastro) y luego se actualiza el stock del insumo
    const guardado = await this.movimientoRepository.save(movimiento);
    await this.insumoRepository.update(dto.insumoId, {
      stockPresentacion: nuevoStock,
      stockUso,
      valorInventario,
      ...(almacenId ? { almacenId } : {}),
    });

    return guardado;
  }
}
