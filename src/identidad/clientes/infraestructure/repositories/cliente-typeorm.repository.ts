import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Cliente } from "../../domain/entities/cliente.entity";
import { ClienteRepository } from "../../aplication/ports/cliente.repository";
import { ClienteOrmEntity } from "../persistence/cliente.orm-entity";

@Injectable()
export class ClienteTypeOrmRepository extends ClienteRepository {
  constructor(
    @InjectRepository(ClienteOrmEntity)
    private readonly repo: Repository<ClienteOrmEntity>,
  ) {
    super();
  }

  async crear(cliente: Cliente): Promise<Cliente> {
    const orm = this.repo.create(this.aOrm(cliente));
    const guardado = await this.repo.save(orm);

    return this.aDominio(guardado);
  }

  async actualizar(cliente: Cliente): Promise<Cliente> {
    const actualizado = await this.repo.save(this.aOrm(cliente));

    return this.aDominio(actualizado);
  }

  async eliminar(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  async buscarPorId(id: number): Promise<Cliente | null> {
    const cliente = await this.repo.findOne({
      where: { id },
    });

    return cliente ? this.aDominio(cliente) : null;
  }

  private aDominio(orm: ClienteOrmEntity): Cliente {
    return new Cliente(
      orm.id,
      orm.nombre,
      orm.identificacion ?? undefined,
      orm.telefono ?? undefined,
      orm.email ?? undefined,
      orm.direccion ?? undefined,
      orm.notas ?? undefined,
      orm.created_at,
    );
  }

  private aOrm(cliente: Cliente): Partial<ClienteOrmEntity> {
    return {
      id: cliente.id ?? undefined,
      nombre: cliente.nombre,
      identificacion: cliente.identificacion ?? null,
      telefono: cliente.telefono ?? null,
      email: cliente.email ?? null,
      direccion: cliente.direccion ?? null,
      notas: cliente.notas ?? null,
    };
  }
}
