import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PermisoOrmEntity } from './infrastructure/persistence/permiso.orm-entity';
import { PermisoTypeOrmRepository } from './infrastructure/persistence/permiso-typeorm.repository';

import { PermisoRepository } from './domain/permisos.repository';

import { PermisosController } from './infrastructure/http/permisos.controller';

import { CrearPermisoUseCase } from './application/use-cases/crear-permiso.usecase';
import { ActualizarPermisoUseCase } from './application/use-cases/actualizar-permiso.usecase';
import { EliminarPermisoUseCase } from './application/use-cases/eliminar-permiso.usecase';

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