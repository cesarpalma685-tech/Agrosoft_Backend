import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WikiTipoEpaController } from './infrastructure/controllers/wiki-tipo-epa.controller';
import { CrearWikiTipoEpaUseCase } from './application/use-cases/crear-wiki-tipo-epa.use-case';
import { ListarWikiTipoEpaUseCase } from './application/use-cases/listar-wiki-tipo-epa.use-case';
import { WikiTipoEpaRepositoryPort } from './application/ports/wiki-tipo-epa.repository.port';
import { WikiTipoEpaTypeOrmRepository } from './infrastructure/repositories/wiki-tipo-epa.typeorm.repository';
import { WikiTipoEpaOrmEntity } from './infrastructure/persistence/wiki-tipo-epa.orm-entity';

@Module({
  imports: [TypeOrmModule.forFeature([WikiTipoEpaOrmEntity])],
  controllers: [WikiTipoEpaController],
  providers: [
    CrearWikiTipoEpaUseCase,
    ListarWikiTipoEpaUseCase,
    { provide: WikiTipoEpaRepositoryPort, useClass: WikiTipoEpaTypeOrmRepository },
  ],
  exports: [WikiTipoEpaRepositoryPort],
})
export class WikiTipoEpaModule {}