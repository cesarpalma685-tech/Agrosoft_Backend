import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PermisoOrmEntity } from '../../src/permisos/infraestructure/persistence/permiso.orm-entity';
import { PermisoTypeOrmRepository } from '../permisos/infraestructure/repositories/permiso-typeorm.repository';

import { PermisoRepository } from '../permisos/aplication/ports/permisos.repository';

import { PermisosController } from './infraestructure/controllers/permisos.controller';

import { CrearPermisoUseCase } from '../../src/permisos/aplication/use-cases/crear-permiso.usecase';
import { ActualizarPermisoUseCase } from '../../src/permisos/aplication/use-cases/actualizar-permiso.usecase';
import { EliminarPermisoUseCase } from '../../src/permisos/aplication/use-cases/eliminar-permiso.usecase';

@Module({
imports: [
    TypeOrmModule.forFeature([PermisoOrmEntity]),
],

controllers: [
    PermisosController,
],

providers: [
CrearPermisoUseCase,
ActualizarPermisoUseCase,
EliminarPermisoUseCase,
    {
    provide: PermisoRepository,
    useClass: PermisoTypeOrmRepository,
    },
],

exports: [
    PermisoRepository,
],
})
export class PermisoModule {}