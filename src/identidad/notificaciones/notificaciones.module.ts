import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NotificacionOrmEntity } from './infrastructure/persistence/notificaciones.orm-entity';
import { NotificacionTypeOrmRepository } from './infrastructure/persistence/notificaciones-typeorm.repository';

import { NotificacionRepository } from './domain/notificaciones.repository';

import { NotificacionesController } from './infrastructure/http/notificaciones.controller';

import { CrearNotificacionUseCase } from './application/use-cases/crear-notificaciones.usecase';
import { ActualizarNotificacionUseCase } from './application/use-cases/actualizar-notificaciones.usecase';
import { EliminarNotificacionUseCase } from './application/use-cases/eliminar-notificaciones.usecase';

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