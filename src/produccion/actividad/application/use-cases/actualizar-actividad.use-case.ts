import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { ActividadRepositoryPort } from "../ports/actividad.repository.port";
import { ActualizarActividadDto } from "../dto/crear-actividad.dto";
import { Actividad } from "../../domain/entities/actividad.entity";
import { ActividadHistorialRepositoryPort } from "../../../../actividades_detalles/actividades_historial/application/ports/actividad-historial.repository.port";
import { ActividadHistorial } from "../../../../actividades_detalles/actividades_historial/domain/entities/actividad-historial.entity";
import { CultivoRepositoryPort } from "../../../cultivo/application/ports/cultivo.repository.port";
import { ActividadResponsableRepositoryPort } from "../../../../actividades_detalles/actividades_responsable/application/ports/actividad-responsable.repository.port";
import { ActividadResponsable } from "../../../../actividades_detalles/actividades_responsable/domain/entities/actividad_responsable.entity";
import { ListarActividadUseCase } from "./listar-actividad.use-case";

@Injectable()
export class ActualizarActividadUseCase {
  constructor(
    private readonly actividadRepository: ActividadRepositoryPort,
    private readonly historialRepository: ActividadHistorialRepositoryPort,
    private readonly cultivoRepository: CultivoRepositoryPort,
    private readonly responsableRepository: ActividadResponsableRepositoryPort,
    private readonly listar: ListarActividadUseCase,
  ) {}

  async execute(id: number, dto: ActualizarActividadDto, usuarioId: number) {
    const actual = await this.actividadRepository.findById(id);
    if (!actual) throw new NotFoundException(`La actividad con ID ${id} no existe`);

    // Completar una actividad descuenta inventario y genera costos: tiene su propio endpoint.
    if (dto.estado === "completada" && actual.estado !== "completada") {
      throw new BadRequestException("Para completar la actividad usa «Completar actividad»: descuenta el inventario usado");
    }

    const { motivo, responsables, ...campos } = dto;
    const cambios: Record<string, { antes: unknown; despues: unknown }> = {};
    const aplicar: Record<string, unknown> = {};
    for (const [campo, nuevo] of Object.entries(campos)) {
      if (nuevo === undefined) continue;
      const antes = (actual as unknown as Record<string, unknown>)[campo] ?? null;
      const mismo = campo === "fecha" ? new Date(String(antes)).getTime() === new Date(String(nuevo)).getTime() : String(antes) === String(nuevo);
      if (mismo) continue;
      cambios[campo] = { antes, despues: nuevo };
      aplicar[campo] = nuevo;
    }

    // Horas de trabajo: se reemplazan los responsables y se corrige el costo de mano de obra, también en el cultivo
    if (responsables) {
      const anteriores = await this.responsableRepository.findByActividadIds([id]);
      const costoAntes = anteriores.reduce((s, r) => s + r.costo, 0);
      const horasAntes = anteriores.reduce((s, r) => s + r.horas, 0);
      const firma = (lista: { usuarioId: number; horas: number; precioHora: number }[]) =>
        JSON.stringify(lista.map((r) => [r.usuarioId, r.horas, r.precioHora]));

      if (firma(anteriores) !== firma(responsables)) {
        const horas = responsables.reduce((s, r) => s + r.horas, 0);
        const costo = Math.round((responsables.reduce((s, r) => s + r.horas * r.precioHora, 0) + Number.EPSILON) * 100) / 100;

        await this.responsableRepository.eliminarPorActividad(id);
        for (const r of responsables) {
          const fila = new ActividadResponsable();
          Object.assign(fila, { actividadId: id, usuarioId: r.usuarioId, horas: r.horas, precioHora: r.precioHora, costo: r.horas * r.precioHora });
          await this.responsableRepository.save(fila);
        }
        Object.assign(aplicar, { horasActividad: horas, costoManoObra: costo, precioHoraActividad: horas > 0 ? costo / horas : 0 });
        cambios["horasTrabajo"] = { antes: horasAntes, despues: horas };
        cambios["manoObra"] = { antes: costoAntes, despues: costo };

        const cultivo = await this.cultivoRepository.findById(actual.cultivoId);
        if (cultivo && costo !== costoAntes) {
          await this.cultivoRepository.update(cultivo.id, { costoTotal: Math.max(0, Number(cultivo.costoTotal ?? 0) + costo - costoAntes) });
        }
      }
    }

    if (Object.keys(aplicar).length > 0) {
      await this.actividadRepository.update(id, aplicar as Partial<Actividad>);
      // Quién cambió qué, cuándo y por qué (RF5.9)
      const registro = new ActividadHistorial();
      Object.assign(registro, { actividadId: id, usuarioId, motivo, cambios });
      await this.historialRepository.save(registro);
    }
    return await this.listar.obtener(id);
  }
}
