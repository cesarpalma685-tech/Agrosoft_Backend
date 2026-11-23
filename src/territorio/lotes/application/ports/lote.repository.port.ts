import { LoteDto } from "../../domain/entities/lote.dto";

export abstract class LoteRepositoryPort {
  abstract save(lote: LoteDto): Promise<LoteDto>;

  abstract findById(id: number): Promise<LoteDto | null>;

  abstract findAll(): Promise<LoteDto[]>;

  abstract update(id: number, lote: Partial<LoteDto>): Promise<LoteDto | null>;

  abstract softDelete(id: number): Promise<void>;

  // Área (m² y ha) y centroide de un polígono GeoJSON, calculados con PostGIS
  abstract calcularMetricas(
    geom: object,
  ): Promise<{ areaM2: number; areaHa: number; centroide: object }>;
}
