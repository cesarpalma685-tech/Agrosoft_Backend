import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Proveedores } from '../domain/entities/proveedores.dto';
import { ProveedoresRepositoryPort } from '../application/ports/proveedores.repository.port';
import { ProveedoresPersistence } from '../infrastructure/persistence/proveedores.orm-entity';

@Injectable()
export class ProveedoresRepository implements ProveedoresRepositoryPort {
  constructor(
    @InjectRepository(ProveedoresPersistence)
    private readonly repository: Repository<ProveedoresPersistence>,
  ) {}

  async crear(proveedor: Proveedores): Promise<Proveedores> {
    const nuevoProveedor = this.repository.create(proveedor);

    const guardado = await this.repository.save(nuevoProveedor);

    return this.toDomain(guardado);
  }

  async listar(): Promise<Proveedores[]> {
    const proveedores = await this.repository.find();

    return proveedores.map((proveedor) =>
      this.toDomain(proveedor),
    );
  }

  async obtenerPorId(id: number): Promise<Proveedores | null> {
    const proveedor = await this.repository.findOne({
      where: { id },
    });

    return proveedor ? this.toDomain(proveedor) : null;
  }

  async actualizar(
    id: number,
    datos: Partial<Proveedores>,
  ): Promise<Proveedores | null> {
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
    proveedor: ProveedoresPersistence,
  ): Proveedores {
    const domain = new Proveedores();

    domain.nombre = proveedor.nombre;

    return domain;
  }
}