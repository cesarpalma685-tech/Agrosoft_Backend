import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { SensorAlertasController } from "./infrastructure/controllers/sensor_alertas.controller";
import { SensorAlertasPersistence } from "./infrastructure/persistence/sensor_alertas.orm-entity";
import { SensorAlertasRepositoryPort } from "./application/ports/sensor_alertas.repository.port";

import { CrearSensorAlertasUseCase } from "./application/use-cases/crear-sensor_alertas.use-case";
import { ListarSensorAlertasUseCase } from "./application/use-cases/listar-sensor_alertas.use-case";
import { ObtenerSensorAlertasPorIdUseCase } from "./application/use-cases/obtener-sensor_alertas-por-id.use-case";
import { ActualizarSensorAlertasUseCase } from "./application/use-cases/actualizar-sensor_alertas.use-case";
import { EliminarSensorAlertasPorIdUseCase } from "./application/use-cases/eliminar-sensor_alertas-por-id.use-case";
import { SensorAlertasRepository } from "./infrastructure/repositories/sensor_alertas.typeorm.repository";

@Module({
  imports: [TypeOrmModule.forFeature([SensorAlertasPersistence])],

  controllers: [SensorAlertasController],

  providers: [
    CrearSensorAlertasUseCase,
    ListarSensorAlertasUseCase,
    ObtenerSensorAlertasPorIdUseCase,
    ActualizarSensorAlertasUseCase,
    EliminarSensorAlertasPorIdUseCase,

    SensorAlertasRepository,

    {
      provide: SensorAlertasRepositoryPort,
      useExisting: SensorAlertasRepository,
    },
  ],

  exports: [SensorAlertasRepositoryPort],
})
export class SensorAlertasModule {}
