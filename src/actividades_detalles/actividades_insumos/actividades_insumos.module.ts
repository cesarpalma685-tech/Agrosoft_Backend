import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActividadInsumoOrmEntity } from './infrastructure/persistence/actividad-insumo.orm-entity';
import { ActividadInsumoRepositoryPort } from './application/ports/actividad-insumo.repository.port';
import { ActividadInsumoTypeOrmRepository } from './infrastructure/repositories/actividad-insumo.typeorm.repository';
import { CrearActividadInsumoUseCase } from './application/use-cases/registrar-actividad-insumo.use-case';
import { ListarActividadInsumosUseCase } from './application/use-cases/listar-actividad-insumos.use-case';
import { ActividadInsumoController } from './infrastructure/controller/actividad-insumo.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ActividadInsumoOrmEntity])],
  controllers: [ActividadInsumoController],
  providers: [
    CrearActividadInsumoUseCase,
    ListarActividadInsumosUseCase,
    {
      provide: ActividadInsumoRepositoryPort,
      useClass: ActividadInsumoTypeOrmRepository,
    },
  ],
  exports: [ActividadInsumoRepositoryPort],
})
export class ActividadInsumosModule {}
