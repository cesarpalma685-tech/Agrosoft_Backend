import { Injectable, NotFoundException } from "@nestjs/common";
import { Sublote } from "../../domain/entities/sublote.dto";
import { SubloteRepositoryPort } from "../ports/sublote.repository.port";
import { ActualizarSubloteDto } from "../dto/actualizar-sublote.dto";
import { coordenadasAPoligono } from "../utils/coordenadas-a-poligono";

@Injectable()
export class ActualizarSubloteUseCase {
  constructor(private readonly subloteRepository: SubloteRepositoryPort) {}

  async execute(
    id: number,
    dto: ActualizarSubloteDto,
  ): Promise<Sublote | null> {
    // Verificar que el sublote exista
    const existe = await this.subloteRepository.findById(id);

    if (!existe) {
      throw new NotFoundException(
        `El sublote con ID ${id} no existe para actualizar`,
      );
    }

    const { coordenadas, ...campos } = dto;
    const cambios: Partial<Sublote> = { ...campos };

    // Si cambiaron los puntos, recalcular polígono, área y centroide
    if (coordenadas) {
      const geom = coordenadasAPoligono(coordenadas);
      Object.assign(cambios, {
        geom,
        ...(await this.subloteRepository.calcularMetricas(geom)),
      });
    }

    // Actualizar el sublote
    const subloteActualizado = await this.subloteRepository.update(id, cambios);

    if (!subloteActualizado) {
      throw new NotFoundException(
        `No se pudo actualizar el sublote con ID ${id}`,
      );
    }

    return subloteActualizado;
  }
}
