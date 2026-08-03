import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovimientoProduccionController } from './infrastructure/http/movimiento-produccion.controller';
import { CreateMovimientoProduccionUseCase } from './application/create-movimiento-produccion.use-case';
import { ListMovimientoProduccionUseCase } from './application/list-movimiento-produccion.use-case';
import { MOVIMIENTO_PRODUCCION_REPOSITORY } from './domain/movimiento-produccion-repository.port';
import { MovimientoProduccionTypeOrmRepository } from './infrastructure/persistence/movimiento-produccion-typeorm.repository';
import { MovimientoProduccionOrmEntity } from './infrastructure/persistence/movimiento-produccion.orm-entity';
import { LoteProduccionOrmEntity } from '../lote-produccion/infrastructure/persistence/lote-produccion.orm-entity';

@Module({
  imports: [TypeOrmModule.forFeature([MovimientoProduccionOrmEntity, LoteProduccionOrmEntity])],
  controllers: [MovimientoProduccionController],
  providers: [
    CreateMovimientoProduccionUseCase,
    ListMovimientoProduccionUseCase,
    {
      provide: MOVIMIENTO_PRODUCCION_REPOSITORY,
      useClass: MovimientoProduccionTypeOrmRepository,
    },
  ],
})
export class MovimientoProduccionModule {}