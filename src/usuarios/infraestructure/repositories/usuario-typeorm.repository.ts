import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../../domain/entities/usuario.entity';
import { UsuarioRepository } from '../../aplication/ports/usuario.repository';
import { UsuarioOrmEntity } from '../persistence/usuario.orm-entity';

@Injectable()
export class UsuarioTypeOrmRepository extends UsuarioRepository {
  constructor(
    @InjectRepository(UsuarioOrmEntity)
    private readonly repo: Repository<UsuarioOrmEntity>,
  ) {
    super();
  }

  async crear(usuario: Usuario): Promise<Usuario> {
    const orm = this.repo.create(this.aOrm(usuario));
    const guardado = await this.repo.save(orm);
    return this.aDominio(guardado);
  }

  async buscarPorId(id: number): Promise<Usuario | null> {
    const orm = await this.repo.findOne({ where: { id } });
    return orm ? this.aDominio(orm) : null;
  }

  async buscarPorCorreo(correo: string): Promise<Usuario | null> {
    const orm = await this.repo.findOne({ where: { correo } });
    return orm ? this.aDominio(orm) : null;
  }

  async listar(): Promise<Usuario[]> {
    const registros = await this.repo.find();
    return registros.map((r) => this.aDominio(r));
  }

  async actualizar(usuario: Usuario): Promise<Usuario> {
    const orm = this.aOrm(usuario);
    await this.repo.save(orm);
    return usuario;
  }

  async eliminar(id: number): Promise<void> {
    await this.repo.softDelete(id);
  }

  private aDominio(orm: UsuarioOrmEntity): Usuario {
    return new Usuario(
      orm.id,
      orm.nombre,
      orm.apellido,
      orm.identificacion,
      orm.correo,
      orm.passwordHash,
      orm.idFicha,
      orm.telefono,
      orm.programaFormacionId,
      orm.estado,
      orm.avatarUrl,
      orm.emailVerifiedAt,
      orm.lastLoginAt,
      orm.created_at,
    );
  }

  private aOrm(usuario: Usuario): Partial<UsuarioOrmEntity> {
    return {
      id: usuario.id ?? undefined,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      correo: usuario.correo,
      passwordHash: usuario.passwordHash,
      idFicha: usuario.idFicha,
      telefono: usuario.telefono,
      programaFormacionId: usuario.programaFormacionId,
      estado: usuario.estado,
      identificacion: usuario.identificacion,
      avatarUrl: usuario.avatarUrl,
      
    };
  }
}