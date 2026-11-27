import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EpaController } from "./infrastructure/controllers/epa.controller";
import { EpaRepositoryPort } from "./application/ports/epa.repository.port";
import { EpaTypeOrmRepository } from "./infrastructure/repositories/epa.typeorm.repository";
import { EpaOrmEntity } from "./infrastructure/persistence/epa.orm-entity";
import { TipoCultivoWikiOrmEntity } from "../../wiki_agronomia/tipo-cultivo-wiki/infrastructure/persistence/tipo-cultivo-wiki.orm-entity";

import { EpaService } from "./application/epa.service";

@Module({
  imports: [TypeOrmModule.forFeature([EpaOrmEntity, TipoCultivoWikiOrmEntity])],
  controllers: [EpaController],
  providers: [
    EpaService,
    { provide: EpaRepositoryPort, useClass: EpaTypeOrmRepository },
  ],
  exports: [EpaRepositoryPort],
})
export class EpaModule {}
