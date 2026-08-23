import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActividadHistorialOrmEntity } from './infrastructure/persistence/actividad-historial.orm-entity';

import { ActividadHistorialRepositoryPort } from './application/ports/actividad-historial.repository.port';
import { ActividadHistorialTypeOrmRepository } from './infrastructure/repositories/actividad-historial.typeorm.repository';
import { CrearActividadHistorialUseCase } from './application/use-cases/registrar-historial.use-case';
import { ListarActividadesHistorialUseCase } from './application/use-cases/listar-historial-por-actividad.use-case';
import { ActividadHistorialController } from './infrastructure/controller/actividad-historial.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ActividadHistorialOrmEntity])],
  controllers: [ActividadHistorialController],
  providers: [
    CrearActividadHistorialUseCase,
    ListarActividadesHistorialUseCase,
    {
      provide: ActividadHistorialRepositoryPort,
      useClass: ActividadHistorialTypeOrmRepository,
    },
  ],
  exports: [ActividadHistorialRepositoryPort],
})
export class ActividadesHistorialModule {}
