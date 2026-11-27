import { Injectable, NotFoundException } from "@nestjs/common";
import { ActividadRepositoryPort } from "../ports/actividad.repository.port";
import { ActividadResponsableRepositoryPort } from "../../../../actividades_detalles/actividades_responsable/application/ports/actividad-responsable.repository.port";
import { ActividadHistorialRepositoryPort } from "../../../../actividades_detalles/actividades_historial/application/ports/actividad-historial.repository.port";
import { ActividadInsumoReservaRepositoryPort } from "../../../../actividades_detalles/actividades_insumos_reversa/application/ports/actividad-insumo-reserva.repository.port";
import { ActividadHerramientaRepositoryPort } from "../../../../actividades_detalles/actividades_herramientas/application/ports/actividad-herramienta.repository.port";
import { ActividadInsumoUsoRepositoryPort } from "../../../../actividades_detalles/actividades_insumos_uso/application/ports/actividad-insumo-uso.repository.port";
import { UsoHerramientaRepositoryPort } from "../../../../actividades_detalles/usos_herramientas/application/ports/uso-herramienta.repository.port";
import { ActividadServicioRepositoryPort } from "../../../../actividades_detalles/actividades_servicios/application/ports/actividad-servicio.repository.port";
import { armarVista } from "../utils/armar-vista";

@Injectable()
export class ListarActividadUseCase {
  constructor(
    private readonly actividadRepository: ActividadRepositoryPort,
    private readonly responsableRepository: ActividadResponsableRepositoryPort,
    private readonly historialRepository: ActividadHistorialRepositoryPort,
    private readonly reservaRepository: ActividadInsumoReservaRepositoryPort,
    private readonly herramientaRepository: ActividadHerramientaRepositoryPort,
    private readonly usoInsumoRepository: ActividadInsumoUsoRepositoryPort,
    private readonly usoHerramientaRepository: UsoHerramientaRepositoryPort,
    private readonly servicioRepository: ActividadServicioRepositoryPort,
  ) {}

  private async detalles(ids: number[]) {
    const [responsables, historial, reservasInsumos, herramientas, usosInsumos, usosHerramientas, servicios] = await Promise.all([
      this.responsableRepository.findByActividadIds(ids),
      this.historialRepository.findByActividadIds(ids),
      this.reservaRepository.findByActividadIds(ids),
      this.herramientaRepository.findByActividadIds(ids),
      this.usoInsumoRepository.findByActividadIds(ids),
      this.usoHerramientaRepository.findByActividadIds(ids),
      this.servicioRepository.findByActividadIds(ids),
    ]);
    return { responsables, historial, reservasInsumos, herramientas, usosInsumos, usosHerramientas, servicios };
  }

  async execute() {
    const actividades = await this.actividadRepository.findAll();
    const detalles = await this.detalles(actividades.map((a) => a.id));
    return actividades.map((a) => armarVista(a, detalles));
  }

  async obtener(id: number) {
    const actividad = await this.actividadRepository.findById(id);
    if (!actividad) throw new NotFoundException(`La actividad con ID ${id} no existe`);
    return armarVista(actividad, await this.detalles([id]));
  }
}
