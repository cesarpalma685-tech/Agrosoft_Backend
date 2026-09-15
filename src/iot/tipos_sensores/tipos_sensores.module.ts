import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { TiposSensoresOrmEntity } from "./infrastructure/persistence/tipos_sensores.orm-entity";
import { TiposSensoresController } from "./infrastructure/controllers/tipos_sensores.controller";

import { TiposSensoresTypeormRepository } from "./infrastructure/repositories/tipos_sensores.typeorm.repository";
import { TiposSensoresRepositoryPort } from "./application/ports/tipos_sensores.repository.port";

import { CrearTiposSensoresUseCase } from "./application/use-cases/crear-tipos_sensores.use-case";
import { ActualizarTiposSensoresUseCase } from "./application/use-cases/actualizar-tipos_sensores.use-case";
import { EliminarTiposSensoresUseCase } from "./application/use-cases/eliminar-tipos_sensores-por-id.use-case";
import { ListarTiposSensoresUseCase } from "./application/use-cases/listar-tipos_sensores.use-case";
import { ObtenerTiposSensoresPorIdUseCase } from "./application/use-cases/obtener-tipos_sensores-por-id.use-case";

@Module({
  imports: [TypeOrmModule.forFeature([TiposSensoresOrmEntity])],

  controllers: [TiposSensoresController],

  providers: [
    CrearTiposSensoresUseCase,
    ActualizarTiposSensoresUseCase,
    EliminarTiposSensoresUseCase,
    ListarTiposSensoresUseCase,
    ObtenerTiposSensoresPorIdUseCase,

    {
      provide: TiposSensoresRepositoryPort,
      useClass: TiposSensoresTypeormRepository,
    },
  ],

  exports: [TiposSensoresRepositoryPort],
})
export class TiposSensoresModule {}
