import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { ActividadRepositoryPort } from "../ports/actividad.repository.port";
import { CrearActividadDto } from "../dto/crear-actividad.dto";
import { Actividad } from "../../domain/entities/actividad.entity";
import { CultivoRepositoryPort } from "../../../cultivo/application/ports/cultivo.repository.port";
import { InsumoRepositoryPort } from "../../../../inventario/insumos/application/ports/insumo.repository.port";
import { TipoInsumoEnum } from "../../../../inventario/insumos/domain/enums/tipo-insumo.enum";
import { ActividadResponsableRepositoryPort } from "../../../../actividades_detalles/actividades_responsable/application/ports/actividad-responsable.repository.port";
import { ActividadResponsable } from "../../../../actividades_detalles/actividades_responsable/domain/entities/actividad_responsable.entity";
import { ActividadInsumoReservaRepositoryPort } from "../../../../actividades_detalles/actividades_insumos_reversa/application/ports/actividad-insumo-reserva.repository.port";
import { ActividadInsumoReserva } from "../../../../actividades_detalles/actividades_insumos_reversa/domain/entities/actividad-insumo-reserva.entity";
import { ActividadHerramientaRepositoryPort } from "../../../../actividades_detalles/actividades_herramientas/application/ports/actividad-herramienta.repository.port";
import { ActividadHerramienta } from "../../../../actividades_detalles/actividades_herramientas/domain/entities/actividad-herramienta.entity";
import { ListarActividadUseCase } from "./listar-actividad.use-case";

const ES_HERRAMIENTA = [TipoInsumoEnum.HERRAMIENTA, TipoInsumoEnum.MAQUINARIA];

@Injectable()
export class CrearActividadUseCase {
  constructor(
    private readonly actividadRepository: ActividadRepositoryPort,
    private readonly cultivoRepository: CultivoRepositoryPort,
    private readonly insumoRepository: InsumoRepositoryPort,
    private readonly responsableRepository: ActividadResponsableRepositoryPort,
    private readonly reservaRepository: ActividadInsumoReservaRepositoryPort,
    private readonly herramientaRepository: ActividadHerramientaRepositoryPort,
    private readonly listar: ListarActividadUseCase,
  ) {}

  async execute(dto: CrearActividadDto, usuarioId: number) {
    const cultivo = await this.cultivoRepository.findById(dto.cultivoId);
    if (!cultivo) throw new NotFoundException(`El cultivo con ID ${dto.cultivoId} no existe`);
    if (cultivo.estado === "finalizado" || cultivo.estado === "cancelado") {
      throw new BadRequestException("No se pueden registrar actividades en un cultivo finalizado o cancelado");
    }

    // Todo se valida antes de guardar: si falta stock o herramienta, no se crea nada.
    const reservas = await this.validarInsumos(dto);
    const herramientas = await this.validarHerramientas(dto);

    const { responsables = [], insumos: _insumos, herramientas: _herramientas, ...datos } = dto;
    const horas = responsables.reduce((s, r) => s + r.horas, 0);
    const costoManoObra = responsables.reduce((s, r) => s + r.horas * r.precioHora, 0);

    const nueva = new Actividad();
    Object.assign(nueva, {
      ...Object.fromEntries(Object.entries(datos).filter(([, v]) => v !== undefined)),
      loteId: dto.loteId ?? cultivo.loteId,
      subLoteId: dto.subLoteId ?? cultivo.subloteId ?? undefined,
      estado: dto.estado ?? "pendiente",
      creadoPorUsuarioId: usuarioId,
      horasActividad: horas,
      costoManoObra,
      precioHoraActividad: horas > 0 ? costoManoObra / horas : 0,
    });
    const guardada = await this.actividadRepository.save(nueva);

    for (const r of responsables) {
      const fila = new ActividadResponsable();
      Object.assign(fila, { actividadId: guardada.id, usuarioId: r.usuarioId, horas: r.horas, precioHora: r.precioHora, costo: r.horas * r.precioHora });
      await this.responsableRepository.save(fila);
    }

    // Reservar insumos: queda apartado y baja del disponible (RF5.4 / RF6.5)
    for (const [insumoId, cantidad] of reservas) {
      const fila = new ActividadInsumoReserva();
      Object.assign(fila, { actividadId: guardada.id, insumoId, cantidadReservada: cantidad });
      await this.reservaRepository.save(fila);
      const insumo = await this.insumoRepository.findById(insumoId);
      await this.insumoRepository.update(insumoId, {
        stockReservado: Number(insumo?.stockReservado ?? 0) + cantidad,
      });
    }

    for (const [insumoId, horasEstimadas] of herramientas) {
      const fila = new ActividadHerramienta();
      Object.assign(fila, { actividadId: guardada.id, activoFijoId: insumoId, horasEstimadas });
      await this.herramientaRepository.save(fila);
    }

    // El costo de la actividad se traslada al cultivo (RF5.10 / RF4.5)
    if (costoManoObra > 0) {
      await this.cultivoRepository.update(cultivo.id, {
        costoTotal: Number(cultivo.costoTotal ?? 0) + costoManoObra,
      });
    }

    return await this.listar.obtener(guardada.id);
  }

  /** Suma las cantidades repetidas y comprueba que alcance lo disponible (stock − reservado). */
  private async validarInsumos(dto: CrearActividadDto): Promise<Map<number, number>> {
    const pedidos = new Map<number, number>();
    for (const r of dto.insumos ?? []) pedidos.set(r.insumoId, (pedidos.get(r.insumoId) ?? 0) + r.cantidad);

    for (const [insumoId, cantidad] of pedidos) {
      const insumo = await this.insumoRepository.findById(insumoId);
      if (!insumo) throw new NotFoundException(`El insumo con ID ${insumoId} no existe`);
      if (ES_HERRAMIENTA.includes(insumo.tipoInsumo)) {
        throw new BadRequestException(`«${insumo.nombre}» es una herramienta: asígnala en Herramientas, no en Insumos`);
      }
      const disponible = Number(insumo.stockUso) - Number(insumo.stockReservado);
      if (cantidad > disponible) {
        throw new BadRequestException(
          `No hay suficiente «${insumo.nombre}» disponible: pides ${cantidad} ${insumo.unidadUso} y hay ${disponible}`,
        );
      }
    }
    return pedidos;
  }

  /** Una herramienta no se gasta: queda ocupada mientras la actividad esté pendiente o en progreso. */
  private async validarHerramientas(dto: CrearActividadDto): Promise<Map<number, number>> {
    const pedidas = new Map<number, number>();
    for (const h of dto.herramientas ?? []) pedidas.set(h.insumoId, (pedidas.get(h.insumoId) ?? 0) + h.horasEstimadas);

    for (const insumoId of pedidas.keys()) {
      const herramienta = await this.insumoRepository.findById(insumoId);
      if (!herramienta) throw new NotFoundException(`La herramienta con ID ${insumoId} no existe`);
      if (!ES_HERRAMIENTA.includes(herramienta.tipoInsumo)) {
        throw new BadRequestException(`«${herramienta.nombre}» es un insumo: reserva su cantidad en Insumos`);
      }
      const ocupadas = await this.herramientaRepository.contarOcupadas(insumoId);
      if (ocupadas >= Number(herramienta.stockPresentacion)) {
        throw new BadRequestException(`No hay unidades libres de «${herramienta.nombre}»: todas están ocupadas por otras actividades`);
      }
    }
    return pedidas;
  }
}
