import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NotificacionOrmEntity } from './infraestructure/persistence/notificaciones.orm-entity';
import { NotificacionTypeOrmRepository } from './infraestructure/repositories/notificaciones-typeorm.repository';

import { NotificacionRepository } from './aplication/ports/notificaciones.repository';

import { NotificacionesController } from './infraestructure/controllers/notificaciones.controller';

import { CrearNotificacionUseCase } from './aplication/use-cases/crear-notificaciones.usecase';
import { ActualizarNotificacionUseCase } from './aplication/use-cases/actualizar-notificaciones.usecase';
import { EliminarNotificacionUseCase } from './aplication/use-cases/eliminar-notificaciones.usecase';

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
