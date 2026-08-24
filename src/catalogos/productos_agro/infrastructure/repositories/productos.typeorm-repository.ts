import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProductosAgroDto } from '../../application/dto/crear-productos_agro.dto';
import { ProductosAgroRepositoryPort } from '../../application/ports/productos_agro-repository.port';
import { ProductosAgroPersistence } from '../persistence/productos_agro.orm-entity';

@Injectable()
export class ProductosAgroRepository
  implements ProductosAgroRepositoryPort
{
  constructor(
    @InjectRepository(ProductosAgroPersistence)
    private readonly repository: Repository<ProductosAgroPersistence>,
  ) {}

  async crear(producto: ProductosAgroDto): Promise<ProductosAgroDto> {
    const nuevoProducto = this.repository.create(producto);

    const guardado = await this.repository.save(nuevoProducto);

    return this.toDomain(guardado);
  }

  async listar(): Promise<ProductosAgroDto[]> {
    const productos = await this.repository.find();

    return productos.map((producto) => this.toDomain(producto));
  }

  async obtenerPorId(id: number): Promise<ProductosAgroDto | null> {
    const producto = await this.repository.findOne({
      where: { id },
    });

    return producto ? this.toDomain(producto) : null;
  }

  async actualizar(
    id: number,
    datos: Partial<ProductosAgroDto>,
  ): Promise<ProductosAgroDto | null> {
    await this.repository.update(id, datos);

    const actualizado = await this.repository.findOne({
      where: { id },
    });

    return actualizado ? this.toDomain(actualizado) : null;
  }

  async eliminar(id: number): Promise<boolean> {
    const resultado = await this.repository.softDelete(id);

    return resultado.affected !== 0;
  }

  private toDomain(
    producto: ProductosAgroPersistence,
  ): ProductosAgroDto {
    const domain = new ProductosAgroDto();

    domain.nombre = producto.nombre;
    domain.unidadBase = producto.unidadBase;
    domain.descripcion = producto.descripcion;
    domain.imagen = producto.imagen;

    return domain;
  }
}