import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EpaController } from './infrastructure/http/epa.controller';
import { CreateEpaUseCase } from './application/create-epa.use-case';
import { ListEpaUseCase } from './application/list-epa.use-case';
import { AsociarTiposCultivoEpaUseCase } from './application/asociar-tipos-cultivo-epa.use-case';
import { EPA_REPOSITORY } from './domain/epa-repository.port';
import { EpaTypeOrmRepository } from './infrastructure/persistence/epa-typeorm.repository';
import { EpaOrmEntity } from './infrastructure/persistence/epa.orm-entity';
import { TipoCultivoWikiOrmEntity } from '../../wiki-agronómia/tipo-cultivo-wiki/infrastructure/persistence/tipo-cultivo-wiki.orm-entity';

@Module({
  imports: [TypeOrmModule.forFeature([EpaOrmEntity, TipoCultivoWikiOrmEntity])],
  controllers: [EpaController],
  providers: [
    CreateEpaUseCase,
    ListEpaUseCase,
    AsociarTiposCultivoEpaUseCase,
    {
      provide: EPA_REPOSITORY,
      useClass: EpaTypeOrmRepository,
    },
  ],
})
export class EpaModule {}