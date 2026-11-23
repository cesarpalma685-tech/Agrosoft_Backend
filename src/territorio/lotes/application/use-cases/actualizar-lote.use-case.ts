import { Injectable, NotFoundException } from "@nestjs/common";
import { LoteRepositoryPort } from "../ports/lote.repository.port";
import { LoteDto } from "../../domain/entities/lote.dto";
import { ActualizarLoteDto } from "../dto/actualizar-lote.dto";
import { coordenadasAPoligono } from "../../../sublotes/application/utils/coordenadas-a-poligono";

@Injectable()
export class ActualizarLoteUseCase {
  constructor(private readonly loteRepository: LoteRepositoryPort) {}

  async execute(id: number, dto: ActualizarLoteDto): Promise<LoteDto> {
    const existe = await this.loteRepository.findById(id);

    if (!existe) {
      throw new NotFoundException(
        `El lote con ID ${id} no existe para actualizar`,
      );
    }

    const { coordenadas, ...campos } = dto;
    const cambios: Partial<LoteDto> = { ...campos };

    // Si cambiaron los puntos, recalcular polígono, área y centroide
    if (coordenadas) {
      const geom = coordenadasAPoligono(coordenadas);
      Object.assign(cambios, {
        geom,
        ...(await this.loteRepository.calcularMetricas(geom)),
      });
    }

    const loteActualizado = await this.loteRepository.update(id, cambios);

    if (!loteActualizado) {
      throw new NotFoundException(`No se pudo actualizar el lote con ID ${id}`);
    }

    return loteActualizado;
  }
}
