import { CultivoHistorial } from "../../domain/entities/cultivo-historial.entity";

export abstract class CultivoHistorialRepositoryPort {
  abstract save(cultivoHistorial: CultivoHistorial): Promise<CultivoHistorial>;
  abstract findAll(): Promise<CultivoHistorial[]>;
  abstract findByCultivoId(cultivoId: number): Promise<CultivoHistorial[]>;
}
