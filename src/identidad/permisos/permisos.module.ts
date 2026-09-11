import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { PermisoOrmEntity } from "./infraestructure/persistence/permiso.orm-entity";
import { PermisoTypeOrmRepository } from "./infraestructure/repositories/permiso-typeorm.repository";

import { PermisoRepository } from "./aplication/ports/permisos.repository";

import { PermisosController } from "./infraestructure/controllers/permisos.controller";

import { CrearPermisoUseCase } from "./aplication/use-cases/crear-permiso.usecase";
import { ActualizarPermisoUseCase } from "./aplication/use-cases/actualizar-permiso.usecase";
import { EliminarPermisoUseCase } from "./aplication/use-cases/eliminar-permiso.usecase";

@Module({
  imports: [TypeOrmModule.forFeature([PermisoOrmEntity])],

  controllers: [PermisosController],

  providers: [
    CrearPermisoUseCase,
    ActualizarPermisoUseCase,
    EliminarPermisoUseCase,
    {
      provide: PermisoRepository,
      useClass: PermisoTypeOrmRepository,
    },
  ],

  exports: [PermisoRepository],
})
export class PermisoModule {}
