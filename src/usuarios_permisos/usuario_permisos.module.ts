import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsuarioPermisoOrmEntity } from './infrastructure/persistence/usuario_permisos.orm-entity';
import { UsuarioPermisoTypeOrmRepository } from './infrastructure/persistence/usuario_permisos-typeorm.repository';

import { UsuarioPermisoRepository } from './domain/usuarios_permisos.repository';

import { UsuarioPermisosController } from './infrastructure/http/usuario_permisos.controller';

import { CrearUsuarioPermisoUseCase } from './application/use-cases/crear-usuario_permisos.usecase';
import { ActualizarUsuarioPermisoUseCase } from './application/use-cases/actualizar-usuario_permisos.usecase';
import { EliminarUsuarioPermisoUseCase } from './application/use-cases/eliminar-usuario_permisos.usecase';

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