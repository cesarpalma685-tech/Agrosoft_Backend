import { Injectable, NotFoundException } from "@nestjs/common";
import { UnidadProductivaRepositoryPort } from "../ports/unidad-productiva.repository.port";
import { CrearUnidadProductivaDto } from "../dto/crear-unidad-productiva.dto";
import { ActualizarUnidadProductivaDto } from "../dto/actualizar-unidad-productiva.dto";
import { UnidadProductivaDto } from "../../domain/entities/unidad-productiva.dto";

@Injectable()
export class CrearUnidadProductivaUseCase {
  constructor(private readonly repository: UnidadProductivaRepositoryPort) {}

  async execute(dto: CrearUnidadProductivaDto): Promise<UnidadProductivaDto> {
    return await this.repository.save({
      nombre: dto.nombre.trim(),
      descripcion: dto.descripcion?.trim() || null,
      responsable_id: dto.responsable_id ?? null,
      estado: dto.estado,
    });
  }
}

@Injectable()
export class ListarUnidadesProductivasUseCase {
  constructor(private readonly repository: UnidadProductivaRepositoryPort) {}

  async execute(): Promise<UnidadProductivaDto[]> {
    return await this.repository.findAll();
  }
}

@Injectable()
export class ObtenerUnidadProductivaPorIdUseCase {
  constructor(private readonly repository: UnidadProductivaRepositoryPort) {}

  async execute(id: number): Promise<UnidadProductivaDto> {
    const unidad = await this.repository.findById(id);
    if (!unidad) throw new NotFoundException(`La unidad productiva con ID ${id} no existe`);
    return unidad;
  }
}

@Injectable()
export class ActualizarUnidadProductivaUseCase {
  constructor(private readonly repository: UnidadProductivaRepositoryPort) {}

  async execute(id: number, dto: ActualizarUnidadProductivaDto): Promise<UnidadProductivaDto> {
    const existe = await this.repository.findById(id);
    if (!existe) throw new NotFoundException(`La unidad productiva con ID ${id} no existe para actualizar`);

    const cambios: Partial<UnidadProductivaDto> = {};
    if (dto.nombre !== undefined) cambios.nombre = dto.nombre.trim();
    if (dto.descripcion !== undefined) cambios.descripcion = dto.descripcion.trim() || null;
    if (dto.responsable_id !== undefined) cambios.responsable_id = dto.responsable_id;
    if (dto.estado !== undefined) cambios.estado = dto.estado;

    const actualizada = await this.repository.update(id, cambios);
    if (!actualizada) throw new NotFoundException(`No se pudo actualizar la unidad productiva con ID ${id}`);
    return actualizada;
  }
}

@Injectable()
export class EliminarUnidadProductivaUseCase {
  constructor(private readonly repository: UnidadProductivaRepositoryPort) {}

  async execute(id: number): Promise<void> {
    const unidad = await this.repository.findById(id);
    if (!unidad) throw new NotFoundException(`La unidad productiva con ID ${id} no existe para eliminar`);
    await this.repository.softDelete(id);
  }
}
