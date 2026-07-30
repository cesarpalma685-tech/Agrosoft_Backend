import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolOrmEntity } from './infrastructure/persistence/rol.orm-entity';
import { RolTypeOrmRepository } from './infrastructure/persistence/rol-typeorm.repository';
import { RolRepository } from './domain/rol.repository';
import { RolesController } from './infrastructure/http/roles.controller';
import { CrearRolUseCase } from './application/use-cases/crear-rol.usecase';
import { ActualizarRolUseCase } from './application/use-cases/actualizar-rol.usecase';
import { EliminarRolUseCase } from './application/use-cases/eliminar-rol.usecase';

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