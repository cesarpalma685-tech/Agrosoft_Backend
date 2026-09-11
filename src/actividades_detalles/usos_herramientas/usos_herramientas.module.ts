import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsoHerramientaOrmEntity } from "./infrastructure/persistence/uso-herramienta.orm-entity";

import { UsoHerramientaRepositoryPort } from "./application/ports/uso-herramienta.repository.port";
import { UsoHerramientaTypeOrmRepository } from "./infrastructure/repositories/uso-herramienta.typeorm.repository";

import { CrearUsoHerramientaUseCase } from "./application/use-cases/crear-usos-herramientas-por-actividad.use-case";
import { ListarUsosHerramientaUseCase } from "./application/use-cases/listar-uso-herramienta.use-case";

import { UsoHerramientaController } from "./infrastructure/controller/uso-herramienta.controller";

@Module({
  imports: [TypeOrmModule.forFeature([UsoHerramientaOrmEntity])],
  controllers: [UsoHerramientaController],
  providers: [
    CrearUsoHerramientaUseCase,
    ListarUsosHerramientaUseCase,
    {
      provide: UsoHerramientaRepositoryPort,
      useClass: UsoHerramientaTypeOrmRepository,
    },
  ],
  exports: [UsoHerramientaRepositoryPort],
})
export class UsosHerramientasModule {}
