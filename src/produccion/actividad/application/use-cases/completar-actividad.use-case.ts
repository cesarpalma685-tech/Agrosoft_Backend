import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { ActividadRepositoryPort } from "../ports/actividad.repository.port";
import { CompletarActividadDto } from "../dto/crear-actividad.dto";
import { CultivoRepositoryPort } from "../../../cultivo/application/ports/cultivo.repository.port";
import { InsumoRepositoryPort } from "../../../../inventario/insumos/application/ports/insumo.repository.port";
import { MovimientoInsumoRepositoryPort } from "../../../../inventario/movimientos_isumos/application/ports/crear-movimiento-insumo.repository.port";
import { MovimientoInsumo } from "../../../../inventario/movimientos_isumos/domain/entities/movimiento-insumo.entity";
import { TipoMovimientoInsumoEnum } from "../../../../inventario/movimientos_isumos/domain/enum/tipo-movimiento-insumo.enum";
import { ActividadInsumoReservaRepositoryPort } from "../../../../actividades_detalles/actividades_insumos_reversa/application/ports/actividad-insumo-reserva.repository.port";
import { ActividadHerramientaRepositoryPort } from "../../../../actividades_detalles/actividades_herramientas/application/ports/actividad-herramienta.repository.port";
import { ActividadInsumoUsoRepositoryPort } from "../../../../actividades_detalles/actividades_insumos_uso/application/ports/actividad-insumo-uso.repository.port";
import { ActividadInsumoUso } from "../../../../actividades_detalles/actividades_insumos_uso/domain/entities/actividad-insumo-uso.entity";
import { UsoHerramientaRepositoryPort } from "../../../../actividades_detalles/usos_herramientas/application/ports/uso-herramienta.repository.port";
import { UsoHerramienta } from "../../../../actividades_detalles/usos_herramientas/domain/entities/uso-herramienta.entity";
import { ActividadHistorialRepositoryPort } from "../../../../actividades_detalles/actividades_historial/application/ports/actividad-historial.repository.port";
import { ActividadHistorial } from "../../../../actividades_detalles/actividades_historial/domain/entities/actividad-historial.entity";
import { ListarActividadUseCase } from "./listar-actividad.use-case";

const redondear = (valor: number) => Math.round((valor + Number.EPSILON) * 100) / 100;

/**
 * Cierra la actividad: descuenta lo realmente usado del stock, libera lo reservado, genera la
 * depreciación de las herramientas, suma esos costos al cultivo y deja constancia en el historial.
 */
@Injectable()
export class CompletarActividadUseCase {
  constructor(
    private readonly actividadRepository: ActividadRepositoryPort,
    private readonly cultivoRepository: CultivoRepositoryPort,
    private readonly insumoRepository: InsumoRepositoryPort,
    private readonly movimientoRepository: MovimientoInsumoRepositoryPort,
    private readonly reservaRepository: ActividadInsumoReservaRepositoryPort,
    private readonly herramientaRepository: ActividadHerramientaRepositoryPort,
    private readonly usoInsumoRepository: ActividadInsumoUsoRepositoryPort,
    private readonly usoHerramientaRepository: UsoHerramientaRepositoryPort,
    private readonly historialRepository: ActividadHistorialRepositoryPort,
    private readonly listar: ListarActividadUseCase,
  ) {}

  async execute(id: number, dto: CompletarActividadDto, usuarioId: number) {
    const actividad = await this.actividadRepository.findById(id);
    if (!actividad) throw new NotFoundException(`La actividad con ID ${id} no existe`);
    if (actividad.estado === "completada") throw new BadRequestException("La actividad ya está completada");

    const reservas = await this.reservaRepository.findByActividadIds([id]);
    const herramientas = await this.herramientaRepository.findByActividadIds([id]);
    const usadoInsumo = new Map((dto.insumos ?? []).map((i) => [i.insumoId, i.cantidadUsada]));
    const usadoHoras = new Map((dto.herramientas ?? []).map((h) => [h.insumoId, h.horasUsadas]));

    // Se valida todo antes de tocar el inventario
    for (const [insumoId, usada] of usadoInsumo) {
      const reservada = reservas.filter((r) => r.insumoId === insumoId).reduce((s, r) => s + r.cantidadReservada, 0);
      if (reservada === 0) throw new BadRequestException(`El insumo ${insumoId} no estaba reservado en esta actividad`);
      if (usada > reservada) throw new BadRequestException(`No puedes usar más de lo reservado (${reservada}) de un insumo`);
    }
    for (const insumoId of usadoHoras.keys()) {
      if (!herramientas.some((h) => h.activoFijoId === insumoId)) {
        throw new BadRequestException(`La herramienta ${insumoId} no estaba asignada a esta actividad`);
      }
    }

    let costoInsumos = 0;
    let depreciacion = 0;

    for (const reserva of reservas) {
      const insumo = await this.insumoRepository.findById(reserva.insumoId);
      if (!insumo) continue;
      const usada = usadoInsumo.get(reserva.insumoId) ?? reserva.cantidadReservada;
      const factor = Number(insumo.factorConversionUso) || 1;
      const precioUso = Number(insumo.precioUnitarioUso);
      const stockUso = Math.max(0, redondear(Number(insumo.stockUso) - usada));
      const valorInventario = redondear(stockUso * precioUso);

      if (usada > 0) {
        const movimiento = new MovimientoInsumo();
        Object.assign(movimiento, {
          insumoId: insumo.id,
          tipo: TipoMovimientoInsumoEnum.SALIDA,
          cantidadPresentacion: redondear(usada / factor),
          cantidadUso: usada,
          costoUnitarioPresentacion: Number(insumo.precioUnitarioPresentacion),
          costoUnitarioUso: precioUso,
          costoTotal: redondear(usada * precioUso),
          valorInventarioResultante: valorInventario,
          descripcion: `Uso en la actividad «${actividad.nombre}»`,
          actividadId: id,
          usuarioId,
          almacenOrigenId: insumo.almacenId,
        });
        const guardado = await this.movimientoRepository.save(movimiento);

        const uso = new ActividadInsumoUso();
        Object.assign(uso, {
          actividadId: id,
          insumoId: insumo.id,
          cantidadUso: usada,
          costoUnitarioUso: precioUso,
          costoTotal: redondear(usada * precioUso),
          movimientoInsumoId: guardado.id,
        });
        await this.usoInsumoRepository.save(uso);
        costoInsumos += redondear(usada * precioUso);
      }

      // Se libera toda la reserva: lo usado sale del stock y lo que sobra vuelve a estar disponible
      await this.insumoRepository.update(insumo.id, {
        stockReservado: Math.max(0, redondear(Number(insumo.stockReservado) - reserva.cantidadReservada)),
        stockUso,
        stockPresentacion: redondear(stockUso / factor),
        valorInventario,
      });
    }

    for (const asignada of herramientas) {
      const herramienta = await this.insumoRepository.findById(asignada.activoFijoId);
      if (!herramienta) continue;
      const horas = usadoHoras.get(asignada.activoFijoId) ?? asignada.horasEstimadas;
      if (horas <= 0) continue;

      // Depreciación por horas de uso: (costo − valor residual) / vida útil, sobre el lote de la herramienta
      const unidades = Math.max(1, Number(herramienta.stockPresentacion));
      const costoLote = Number(herramienta.costoAdquisicion);
      const residualLote = Number(herramienta.valorResidual) * unidades;
      const vidaUtil = Number(herramienta.vidaUtilHoras);
      const tasa = vidaUtil > 0 ? Math.max(0, costoLote - residualLote) / (vidaUtil * unidades) : 0;
      const librosAntes = Math.max(0, redondear(costoLote - Number(herramienta.depreciacionAcumulada)));
      const generada = Math.min(redondear(tasa * horas), Math.max(0, librosAntes - residualLote));

      const uso = new UsoHerramienta();
      Object.assign(uso, {
        actividadId: id,
        insumoId: herramienta.id,
        horasUsadas: horas,
        depreciacionGenerada: generada,
        valorEnLibrosAntes: librosAntes,
        valorEnLibrosDespues: redondear(librosAntes - generada),
        fechaUso: new Date(),
      });
      await this.usoHerramientaRepository.save(uso);
      await this.insumoRepository.update(herramienta.id, {
        horasUsadas: Number(herramienta.horasUsadas) + horas,
        depreciacionAcumulada: redondear(Number(herramienta.depreciacionAcumulada) + generada),
      });
      depreciacion += generada;
    }

    await this.actividadRepository.update(id, { estado: "completada" });

    // Insumos y depreciación se trasladan al costo del cultivo (RF5.10 / RF4.5)
    const costoExtra = redondear(costoInsumos + depreciacion);
    if (costoExtra > 0) {
      const cultivo = await this.cultivoRepository.findById(actividad.cultivoId);
      if (cultivo) {
        await this.cultivoRepository.update(cultivo.id, { costoTotal: Number(cultivo.costoTotal ?? 0) + costoExtra });
      }
    }

    const registro = new ActividadHistorial();
    Object.assign(registro, {
      actividadId: id,
      usuarioId,
      motivo: dto.motivo?.trim() || "Actividad completada",
      cambios: { estado: { antes: actividad.estado, despues: "completada" }, costoInsumos, depreciacion },
    });
    await this.historialRepository.save(registro);

    return await this.listar.obtener(id);
  }
}
