import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MetaProduccionOrmEntity } from "./infrastructure/persistence/meta-produccion.orm-entity";
import { MetaProduccionController } from "./infrastructure/controller/meta-produccion.controller";
import { MetasProduccionUseCases } from "./application/use-cases/metas.use-cases";
import { UnidadesProductivasModule } from "../../territorio/unidades_productivas/unidades-productivas.module";

@Module({
  imports: [TypeOrmModule.forFeature([MetaProduccionOrmEntity]), UnidadesProductivasModule],
  controllers: [MetaProduccionController],
  providers: [MetasProduccionUseCases],
})
export class MetasProduccionModule {}
