import { EliminacionTerritorioModule } from "../eliminacion/eliminacion-territorio.module";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UnidadProductivaController } from "./infrastructure/controllers/unidad-productiva.controller";
import { UnidadProductivaOrmEntity } from "./infrastructure/persistence/unidad-productiva.orm-entity";
import { UnidadProductivaRepositoryPort } from "./application/ports/unidad-productiva.repository.port";
import { UnidadProductivaTypeormRepository } from "./infrastructure/repositories/unidad-productiva.typeorm.repository";
import {
  ActualizarUnidadProductivaUseCase,
  CrearUnidadProductivaUseCase,
  EliminarUnidadProductivaUseCase,
  ListarUnidadesProductivasUseCase,
  ObtenerUnidadProductivaPorIdUseCase,
} from "./application/use-cases/unidad-productiva.use-cases";

@Module({
  imports: [TypeOrmModule.forFeature([UnidadProductivaOrmEntity]), EliminacionTerritorioModule],
  controllers: [UnidadProductivaController],
  providers: [
    CrearUnidadProductivaUseCase,
    ListarUnidadesProductivasUseCase,
    ObtenerUnidadProductivaPorIdUseCase,
    ActualizarUnidadProductivaUseCase,
    EliminarUnidadProductivaUseCase,
    { provide: UnidadProductivaRepositoryPort, useClass: UnidadProductivaTypeormRepository },
  ],
  exports: [UnidadProductivaRepositoryPort],
})
export class UnidadesProductivasModule {}
