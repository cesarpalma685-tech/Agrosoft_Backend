import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NotificacionOrmEntity } from '../../src/notificaciones/infraestructure/persistence/notificaciones.orm-entity';
import { NotificacionTypeOrmRepository } from '../../src/notificaciones/infraestructure/repositories/notificaciones-typeorm.repository';

import { NotificacionRepository } from './aplication/ports/notificaciones.repository';

import { NotificacionesController } from './infraestructure/controllers/notificaciones.controller';

import { CrearNotificacionUseCase } from '../../src/notificaciones/aplication/use-cases/crear-notificaciones.usecase';
import { ActualizarNotificacionUseCase } from '../../src/notificaciones/aplication/use-cases/actualizar-notificaciones.usecase';
import { EliminarNotificacionUseCase } from '../../src/notificaciones/aplication/use-cases/eliminar-notificaciones.usecase';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      NotificacionOrmEntity,
    ]),
  ],
  controllers: [
    NotificacionesController,
  ],
  providers: [
    CrearNotificacionUseCase,
    ActualizarNotificacionUseCase,
    EliminarNotificacionUseCase,
    {
      provide: NotificacionRepository,
      useClass: NotificacionTypeOrmRepository,
    },
  ],
  exports: [
    NotificacionRepository,
  ],
})
export class NotificacionModule {}