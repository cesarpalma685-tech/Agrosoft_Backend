import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { SensorOrmEntity } from "./infrastructure/persistence/sensores.orm-entity";
import { SensorController } from "./infrastructure/controllers/sensores.controller";

import { SensorTypeormRepository } from "./infrastructure/repositories/sensores.typeorm.repository";
import { SensorRepositoryPort } from "./application/ports/sensores.repository.port";

import { CrearSensorUseCase } from "./application/use-cases/crear-sensores.use-case";
import { ActualizarSensorUseCase } from "./application/use-cases/actualizar-sensores.use-case";
import { EliminarSensorUseCase } from "./application/use-cases/eliminar-sensores-por-id.use-case";
import { ListarSensoresUseCase } from "./application/use-cases/listar-sensores.use-case";

@Module({
  imports: [TypeOrmModule.forFeature([SensorOrmEntity])],

  controllers: [SensorController],

  providers: [
    CrearSensorUseCase,
    ActualizarSensorUseCase,
    EliminarSensorUseCase,
    ListarSensoresUseCase,

    {
      provide: SensorRepositoryPort,
      useClass: SensorTypeormRepository,
    },
  ],

  exports: [SensorRepositoryPort],
})
export class SensoresModule {}
