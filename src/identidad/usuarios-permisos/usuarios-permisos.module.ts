import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsuarioPermisoOrmEntity } from './infraestructure/persistence/usuario_permisos.orm-entity';
import { UsuarioPermisoTypeOrmRepository } from './infraestructure/repositories/usuario_permisos-typeorm.repository';

import { UsuarioPermisoRepository } from './aplication/ports/usuarios_permisos.repository';

import { UsuarioPermisosController } from './infraestructure/controllers/usuario_permisos.controller';

import { CrearUsuarioPermisoUseCase } from './aplication/use-cases/crear-usuario_permisos.usecase';
import { ActualizarUsuarioPermisoUseCase } from './aplication/use-cases/actualizar-usuario_permisos.usecase';
import { EliminarUsuarioPermisoUseCase } from './aplication/use-cases/eliminar-usuario_permisos.usecase';

@Module({
imports: [
TypeOrmModule.forFeature([
    UsuarioPermisoOrmEntity,]),
],

controllers: [
UsuarioPermisosController,
],

providers: [
CrearUsuarioPermisoUseCase,
ActualizarUsuarioPermisoUseCase,
EliminarUsuarioPermisoUseCase,
{
    provide: UsuarioPermisoRepository,
    useClass: UsuarioPermisoTypeOrmRepository,
},
],

exports: [
    UsuarioPermisoRepository,
],
})
export class UsuarioPermisoModule {}