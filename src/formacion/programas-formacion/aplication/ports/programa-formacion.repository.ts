import { ProgramaFormacion } from "../../domain/entities/programa-formacion.entity";

export abstract class ProgramaFormacionRepository {
  abstract crear(programa: ProgramaFormacion): Promise<ProgramaFormacion>;
  abstract actualizar(programa: ProgramaFormacion): Promise<ProgramaFormacion>;
  abstract eliminar(id: number): Promise<void>;
  abstract listar(): Promise<ProgramaFormacion[]>;
  abstract buscarPorId(id: number): Promise<ProgramaFormacion | null>;
}
