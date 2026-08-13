import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoteProduccionController } from './infrastructure/http/lote-produccion.controller';
import { CreateLoteProduccionUseCase } from './application/create-lote-produccion.use-case';
import { ListLoteProduccionUseCase } from './application/list-lote-produccion.use-case';
import { LOTE_PRODUCCION_REPOSITORY } from './domain/lote-produccion-repository.port';
import { LoteProduccionTypeOrmRepository } from './infrastructure/persistence/lote-produccion-typeorm.repository';
import { LoteProduccionOrmEntity } from './infrastructure/persistence/lote-produccion.orm-entity';

@Module({
  imports: [TypeOrmModule.forFeature([LoteProduccionOrmEntity])],
  controllers: [LoteProduccionController],
  providers: [
    CreateLoteProduccionUseCase,
    ListLoteProduccionUseCase,
    {
      provide: LOTE_PRODUCCION_REPOSITORY,
      useClass: LoteProduccionTypeOrmRepository,
    },
  ],
})
export class LoteProduccionModule {}