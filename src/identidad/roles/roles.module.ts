import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolOrmEntity } from './infraestructure/persistence/rol.orm-entity';
import { RolTypeOrmRepository } from './infraestructure/repositories/rol-typeorm.repository';
import { RolRepository } from './aplication/ports/rol.repository';
import { RolesController } from './infraestructure/controllers/roles.controller';

import { CrearRolUseCase } from './aplication/use-cases/crear-rol.usecase';
import { ActualizarRolUseCase } from './aplication/use-cases/actualizar-rol.usecase';
import { EliminarRolUseCase } from './aplication/use-cases/eliminar-rol.usecase';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RolOrmEntity,
    ]),
  ],

  controllers: [
    RolesController,
  ],

  providers: [
    CrearRolUseCase,
    ActualizarRolUseCase,
    EliminarRolUseCase,
    {
      provide: RolRepository,
      useClass: RolTypeOrmRepository,
    },
  ],

  exports: [
    RolRepository,
  ],

})
export class RolModule {}
