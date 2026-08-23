import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActividadResponsableOrmEntity } from './infrastructure/persistence/actividad-responsable.orm-entity';

import { ActividadResponsableRepositoryPort } from './application/ports/actividad-responsable.repository.port';
import { ActividadResponsableTypeOrmRepository } from './infrastructure/repositories/actividad-responsable.typeorm.repository';
import { AsignarResponsableUseCase } from './application/use-cases/asignar-responsable.use-case';
import { ListarResponsablesPorActividadUseCase } from './application/use-cases/listar-responsables-por-actividad.use-case';
import { ActividadResponsableController } from './infrastructure/controller/actividad-responsable.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ActividadResponsableOrmEntity])],
  controllers: [ActividadResponsableController],
  providers: [
    AsignarResponsableUseCase,
    ListarResponsablesPorActividadUseCase,
    {
      provide: ActividadResponsableRepositoryPort,
      useClass: ActividadResponsableTypeOrmRepository,
    },
  ],
  exports: [ActividadResponsableRepositoryPort],
})
export class ActividadesResponsablesModule {}
