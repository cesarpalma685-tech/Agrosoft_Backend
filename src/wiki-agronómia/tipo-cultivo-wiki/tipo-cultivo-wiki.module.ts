import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoCultivoWikiController } from './infrastructure/http/tipo-cultivo-wiki.controller';
import { CreateTipoCultivoWikiUseCase } from './application/create-tipo-cultivo-wiki.use-case';
import { ListTipoCultivoWikiUseCase } from './application/list-tipo-cultivo-wiki.use-case';
import { TIPO_CULTIVO_WIKI_REPOSITORY } from './domain/tipo-cultivo-wiki-repository.port';
import { TipoCultivoWikiTypeOrmRepository } from './infrastructure/persistence/tipo-cultivo-wiki-typeorm.repository';
import { TipoCultivoWikiOrmEntity } from './infrastructure/persistence/tipo-cultivo-wiki.orm-entity';

@Module({
  imports: [TypeOrmModule.forFeature([TipoCultivoWikiOrmEntity])],
  controllers: [TipoCultivoWikiController],
  providers: [
    CreateTipoCultivoWikiUseCase,
    ListTipoCultivoWikiUseCase,
    {
      provide: TIPO_CULTIVO_WIKI_REPOSITORY,
      useClass: TipoCultivoWikiTypeOrmRepository,
    },
  ],
})
export class TipoCultivoWikiModule {}