import { UnidadProductivaDto } from "../../domain/entities/unidad-productiva.dto";

export abstract class UnidadProductivaRepositoryPort {
  abstract save(unidad: Partial<UnidadProductivaDto>): Promise<UnidadProductivaDto>;
  abstract findById(id: number): Promise<UnidadProductivaDto | null>;
  abstract findAll(): Promise<UnidadProductivaDto[]>;
  abstract update(id: number, unidad: Partial<UnidadProductivaDto>): Promise<UnidadProductivaDto | null>;
  abstract softDelete(id: number): Promise<void>;
}
