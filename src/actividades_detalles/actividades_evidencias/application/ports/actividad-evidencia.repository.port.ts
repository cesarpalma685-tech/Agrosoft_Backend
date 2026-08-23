import { ActividadEvidencia } from "../../domain/entities/actividad_evidencia.entity";


export abstract class ActividadEvidenciaRepositoryPort {
  abstract save(evidencia: ActividadEvidencia): Promise<ActividadEvidencia>;

  abstract findByActividadId(actividadId: number): Promise<ActividadEvidencia[]>;
}
