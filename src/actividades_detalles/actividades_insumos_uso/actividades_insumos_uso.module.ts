import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActividadInsumoUsoOrmEntity } from './infrastructure/persistence/actividad-insumo-uso.orm-entity';

import { ActividadInsumoUsoRepositoryPort } from './application/ports/actividad-insumo-uso.repository.port';
import { ActividadInsumoUsoTypeOrmRepository } from './infrastructure/repositories/actividad-insumo-uso.typeorm.repository';
import { RegistrarInsumoUsoUseCase } from './application/use-cases/registrar-insumo-uso.use-case';
import { ListarInsumosUsoPorActividadUseCase } from './application/use-cases/listar-insumos-uso-por-actividad.use-case';
import { ActividadInsumoUsoController } from './infrastructure/controller/actividad-insumo-uso.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ActividadInsumoUsoOrmEntity])],
  controllers: [ActividadInsumoUsoController],
  providers: [
    RegistrarInsumoUsoUseCase,
    ListarInsumosUsoPorActividadUseCase,
    {
      provide: ActividadInsumoUsoRepositoryPort,
      useClass: ActividadInsumoUsoTypeOrmRepository,
    },
  ],
  exports: [ActividadInsumoUsoRepositoryPort],
})
export class ActividadesInsumosUsoModule {}
