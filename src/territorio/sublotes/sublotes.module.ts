import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { SubloteOrmEntity } from "./infrastructure/persistence/sublote.orm-entity";
import { SubloteController } from "./infrastructure/controllers/sublote.controller";

import { SubloteTypeormRepository } from "./infrastructure/repositories/sublote.typeorm.repository";
import { SubloteRepositoryPort } from "./application/ports/sublote.repository.port";

import { CrearSubloteUseCase } from "./application/use-cases/crear-sublote.use-case";
import { ActualizarSubloteUseCase } from "./application/use-cases/actualizar-sublote.use-case";
import { EliminarSubloteUseCase } from "./application/use-cases/eliminar-sublote.use-case";
import { ListarSublotesUseCase } from "./application/use-cases/listar-sublote.use-case";
import { ObtenerSublotePorIdUseCase } from "./application/use-cases/obtener-sublote-por-id.use-case";

@Module({
  imports: [TypeOrmModule.forFeature([SubloteOrmEntity])],

  controllers: [SubloteController],

  providers: [
    CrearSubloteUseCase,
    ActualizarSubloteUseCase,
    EliminarSubloteUseCase,
    ListarSublotesUseCase,
    ObtenerSublotePorIdUseCase,

    {
      provide: SubloteRepositoryPort,
      useClass: SubloteTypeormRepository,
    },
  ],

  exports: [SubloteRepositoryPort],
})
export class SublotesModule {}
