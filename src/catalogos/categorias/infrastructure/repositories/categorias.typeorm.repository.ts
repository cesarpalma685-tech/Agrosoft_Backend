import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CategoriasDto } from '../../domain/entities/categorias.dto';
import { CategoriasRepositoryPort } from '../../application/ports/categorias-repository.port';
import { CategoriasPersistence } from '../persistence/categorias-orm-entity';

@Injectable()
export class CategoriaRepository implements CategoriasRepositoryPort {
  constructor(
    @InjectRepository(CategoriasPersistence)
    private readonly repository: Repository<CategoriasPersistence>,
  ) {}

  async crear(categoria: CategoriasDto): Promise<CategoriasDto> {
    const nuevaCategoria = this.repository.create(categoria);

    const guardada = await this.repository.save(nuevaCategoria);

    return this.toDomain(guardada);
  }

  async listar(): Promise<CategoriasDto[]> {
    const categorias = await this.repository.find();

    return categorias.map((categoria) => this.toDomain(categoria));
  }

  async buscarPorId(id: number): Promise<CategoriasDto | null> {
    const categoria = await this.repository.findOne({
      where: { id },
    });

    return categoria ? this.toDomain(categoria) : null;
  }

  async actualizar(
    id: number,
    datos: Partial<CategoriasDto>,
  ): Promise<CategoriasDto | null> {
    await this.repository.update(id, datos);

    const actualizada = await this.repository.findOne({
      where: { id },
    });

    return actualizada ? this.toDomain(actualizada) : null;
  }

  async eliminar(id: number): Promise<boolean> {
    const resultado = await this.repository.delete(id);

    return resultado.affected !== 0;
  }

  private toDomain(categoria: CategoriasPersistence): CategoriasDto {
    const domain = new CategoriasDto();

    domain.id = categoria.id;
    domain.nombre = categoria.nombre;
    domain.descripcion = categoria.descripcion;

    return domain;
  }
}