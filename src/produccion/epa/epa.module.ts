import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EpaController } from './infrastructure/controllers/epa.controller';
import { CrearEpaUseCase } from './application/use-cases/crear-epa.use-case';
import { ListarEpaUseCase } from './application/use-cases/listar-epa.use-case';
import { AsociarTiposCultivoEpaUseCase } from './application/use-cases/asociar-tipos-cultivo-epa.use-case';
import { EpaRepositoryPort } from './application/ports/epa.repository.port';
import { EpaTypeOrmRepository } from './infrastructure/repositories/epa.typeorm.repository';
import { EpaOrmEntity } from './infrastructure/persistence/epa.orm-entity';
import { TipoCultivoWikiOrmEntity } from '../../wiki_agronomia/tipo-cultivo-wiki/infrastructure/persistence/tipo-cultivo-wiki.orm-entity';

@Module({
  imports: [TypeOrmModule.forFeature([EpaOrmEntity, TipoCultivoWikiOrmEntity])],
  controllers: [EpaController],
  providers: [
    CrearEpaUseCase,
    ListarEpaUseCase,
    AsociarTiposCultivoEpaUseCase,
    { provide: EpaRepositoryPort, useClass: EpaTypeOrmRepository },
  ],
  exports: [EpaRepositoryPort],
})
export class EpaModule {}