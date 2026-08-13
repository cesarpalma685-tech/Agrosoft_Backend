import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WikiTipoEpaController } from './infrastructure/http/wiki-tipo-epa.controller';
import { CreateWikiTipoEpaUseCase } from './application/create-wiki-tipo-epa.use-case';
import { ListWikiTipoEpaUseCase } from './application/list-wiki-tipo-epa.use-case';
import { WIKI_TIPO_EPA_REPOSITORY } from './domain/wiki-tipo-epa-repository.port';
import { WikiTipoEpaTypeOrmRepository } from './infrastructure/persistence/wiki-tipo-epa-typeorm.repository';
import { WikiTipoEpaOrmEntity } from './infrastructure/persistence/wiki-tipo-epa.orm-entity';

@Module({
  imports: [TypeOrmModule.forFeature([WikiTipoEpaOrmEntity])],
  controllers: [WikiTipoEpaController],
  providers: [
    CreateWikiTipoEpaUseCase,
    ListWikiTipoEpaUseCase,
    {
      provide: WIKI_TIPO_EPA_REPOSITORY,
      useClass: WikiTipoEpaTypeOrmRepository,
    },
  ],
})
export class WikiTipoEpaModule {}