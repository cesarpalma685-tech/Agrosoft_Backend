import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActividadServicioOrmEntity } from './infrastructure/persistence/actividad-servicio.orm-entity';

import { ActividadServicioRepositoryPort } from './application/ports/actividad-servicio.repository.port';
import { ActividadServicioTypeOrmRepository } from './infrastructure/repositories/actividad-servicio.typeorm.repository';
import { ContratarServicioUseCase } from './application/use-cases/contratar-servicio.use-case';
import { ListarServiciosPorActividadUseCase } from './application/use-cases/listar-servicios-por-actividad.use-case';
import { ActividadServicioController } from './infrastructure/controller/actividad-servicio.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ActividadServicioOrmEntity])],
  controllers: [ActividadServicioController],
  providers: [
    ContratarServicioUseCase,
    ListarServiciosPorActividadUseCase,
    {
      provide: ActividadServicioRepositoryPort,
      useClass: ActividadServicioTypeOrmRepository,
    },
  ],
  exports: [ActividadServicioRepositoryPort],
})
export class ActividadesServiciosModule {}
