import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { LoteController } from "./infrastructure/controllers/lote.controller";

import { CrearLoteUseCase } from "./application/use-cases/crear-lote.use-case";
import { ListarLotesUseCase } from "./application/use-cases/listar-lotes.use-case";
import { ObtenerLotePorIdUseCase } from "./application/use-cases/obtener-lote-por-id.use-case";
import { ActualizarLoteUseCase } from "./application/use-cases/actualizar-lote.use-case";
import { EliminarLoteUseCase } from "./application/use-cases/eliminar-lote.use-case";

import { LoteRepositoryPort } from "./application/ports/lote.repository.port";
import { LoteTypeormRepository } from "./infrastructure/repositories/lote.typeorm.repository";

import { LoteOrmEntity } from "./infrastructure/persistence/lote.orm-entity";

@Module({
  imports: [TypeOrmModule.forFeature([LoteOrmEntity])],

  controllers: [LoteController],

  providers: [
    CrearLoteUseCase,
    ListarLotesUseCase,
    ObtenerLotePorIdUseCase,
    ActualizarLoteUseCase,
    EliminarLoteUseCase,

    {
      provide: LoteRepositoryPort,
      useClass: LoteTypeormRepository,
    },
  ],
})
export class LoteModule {}
