import { ActividadResponsable } from "../../domain/entities/actividad_responsable.entity";

export type ResponsableConNombre = ActividadResponsable & { nombre: string };

export abstract class ActividadResponsableRepositoryPort {
  abstract save(
    responsable: ActividadResponsable,
  ): Promise<ActividadResponsable>;
  abstract findAll(): Promise<ActividadResponsable[]>;
  abstract findByActividadIds(ids: number[]): Promise<ResponsableConNombre[]>;
  // Quita los responsables de la actividad (borrado lógico) para reemplazarlos por una lista nueva
  abstract eliminarPorActividad(actividadId: number): Promise<void>;
}
