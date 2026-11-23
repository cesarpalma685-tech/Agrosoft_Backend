import { Injectable } from "@nestjs/common";
import { SubloteRepositoryPort } from "../ports/sublote.repository.port";
import { CrearSubloteDto } from "../dto/crear-sublote.dto";
import { Sublote } from "../../domain/entities/sublote.dto";
import { coordenadasAPoligono } from "../utils/coordenadas-a-poligono";

@Injectable()
export class CrearSubloteUseCase {
  constructor(private readonly subloteRepository: SubloteRepositoryPort) {}

  async execute(dto: CrearSubloteDto): Promise<Sublote> {
    const geom = coordenadasAPoligono(dto.coordenadas);
    const metricas = await this.subloteRepository.calcularMetricas(geom);

    const nuevoSublote = new Sublote();

    Object.assign(nuevoSublote, {
      nombre: dto.nombre,
      lote_id: dto.lote_id,
      descripcion: dto.descripcion,
      estado: dto.estado,
      geom,
      ...metricas,
    });

    return await this.subloteRepository.save(nuevoSublote);
  }
}
