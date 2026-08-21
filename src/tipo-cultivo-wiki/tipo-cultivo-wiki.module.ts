import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoCultivoWikiController } from './infrastructure/controllers/tipo-cultivo-wiki.controller';
import { CrearTipoCultivoWikiUseCase } from './application/use-cases/crear-tipo-cultivo-wiki.use-case';
import { ListarTipoCultivoWikiUseCase } from './application/use-cases/listar-tipo-cultivo-wiki.use-case';
import { TipoCultivoWikiRepositoryPort } from './application/ports/tipo-cultivo-wiki.repository.port';
import { TipoCultivoWikiTypeOrmRepository } from './infrastructure/repositories/tipo-cultivo-wiki.typeorm.repository';
import { TipoCultivoWikiOrmEntity } from './infrastructure/persistence/tipo-cultivo-wiki.orm-entity';

@Module({
  imports: [TypeOrmModule.forFeature([TipoCultivoWikiOrmEntity])],
  controllers: [TipoCultivoWikiController],
  providers: [
    CrearTipoCultivoWikiUseCase,
    ListarTipoCultivoWikiUseCase,
    { provide: TipoCultivoWikiRepositoryPort, useClass: TipoCultivoWikiTypeOrmRepository },
  ],
  exports: [TipoCultivoWikiRepositoryPort],
})
export class TipoCultivoWikiModule {}