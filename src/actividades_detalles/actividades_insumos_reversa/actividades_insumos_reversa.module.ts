import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActividadInsumoReservaOrmEntity } from './infrastructure/persistence/actividad-insumo-reserva.orm-entity';

import { ActividadInsumoReservaRepositoryPort } from './application/ports/actividad-insumo-reserva.repository.port';
import { ActividadInsumoReservaTypeOrmRepository } from './infrastructure/repositories/actividad-insumo-reserva.typeorm.repository';
import { CrearActividadInsumoReservaUseCase } from './application/use-cases/crear-insumo.use-case';
import { ListarActividadInsumoReservasUseCase } from './application/use-cases/listar-insumos-reserva-por-actividad.use-case';
import { ActividadInsumoReservaController } from './infrastructure/controller/actividad-insumo-reserva.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ActividadInsumoReservaOrmEntity])],
  controllers: [ActividadInsumoReservaController],
  providers: [
    CrearActividadInsumoReservaUseCase,
    ListarActividadInsumoReservasUseCase,
    {
      provide: ActividadInsumoReservaRepositoryPort,
      useClass: ActividadInsumoReservaTypeOrmRepository,
    },
  ],
  exports: [ActividadInsumoReservaRepositoryPort],
})
export class ActividadesInsumosReservaModule {}
