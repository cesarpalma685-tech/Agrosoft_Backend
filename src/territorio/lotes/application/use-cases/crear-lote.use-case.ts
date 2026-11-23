import { Injectable } from "@nestjs/common";
import { LoteRepositoryPort } from "../ports/lote.repository.port";
import { CrearLoteDto } from "../dto/crear-lote.dto";
import { LoteDto } from "../../domain/entities/lote.dto";
import { coordenadasAPoligono } from "../../../sublotes/application/utils/coordenadas-a-poligono";

@Injectable()
export class CrearLoteUseCase {
  constructor(private readonly loteRepository: LoteRepositoryPort) {}

  async execute(dto: CrearLoteDto): Promise<LoteDto> {
    const geom = coordenadasAPoligono(dto.coordenadas);
    const metricas = await this.loteRepository.calcularMetricas(geom);

    const nuevoLote = new LoteDto();
    Object.assign(nuevoLote, {
      nombre: dto.nombre,
      unidad_productiva_id: dto.unidad_productiva_id,
      descripcion: dto.descripcion ?? null,
      estado: dto.estado,
      geom,
      ...metricas,
    });

    return await this.loteRepository.save(nuevoLote);
  }
}
