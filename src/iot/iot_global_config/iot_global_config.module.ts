import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { IotGlobalConfigController } from "./infrastructure/controllers/iot_global_config.controller";

import { IotGlobalConfigPersistence } from "./infrastructure/persistence/iot_global_config.orm-entity";

import { IotGlobalConfigRepository } from "./infrastructure/repositories/iot_global_config.typeorm.repository";

import { IotGlobalConfigRepositoryPort } from "./application/ports/iot_global_config.repository.port";

import { CrearIotGlobalConfigUseCase } from "./application/use-cases/crear-iot_global_config.use-case";
import { ListarIotGlobalConfigUseCase } from "./application/use-cases/listar-iot_global_config.use-case";
import { ObtenerIotGlobalConfigUseCase } from "./application/use-cases/obtener-iot_global_config-por-id.use-case";
import { ActualizarIotGlobalConfigUseCase } from "./application/use-cases/actualizar-iot_global_config.use-case";
import { EliminarIotGlobalConfigUseCase } from "./application/use-cases/eliminar-iot_global_config-por-id.use-case";

@Module({
  imports: [TypeOrmModule.forFeature([IotGlobalConfigPersistence])],

  controllers: [IotGlobalConfigController],

  providers: [
    CrearIotGlobalConfigUseCase,
    ListarIotGlobalConfigUseCase,
    ObtenerIotGlobalConfigUseCase,
    ActualizarIotGlobalConfigUseCase,
    EliminarIotGlobalConfigUseCase,

    IotGlobalConfigRepository,

    {
      provide: IotGlobalConfigRepositoryPort,
      useExisting: IotGlobalConfigRepository,
    },
  ],

  exports: [IotGlobalConfigRepositoryPort],
})
export class IotGlobalConfigModule {}
