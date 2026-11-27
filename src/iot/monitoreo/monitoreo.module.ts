import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SensorOrmEntity } from "../sensores/infrastructure/persistence/sensores.orm-entity";
import { SensorLecturasOrmEntity } from "../sensor_lecturas/infrastructure/persistence/sensor_lecturas.orm-entity";
import { SensorAlertasPersistence } from "../sensor_alertas/infrastructure/persistence/sensor_alertas.orm-entity";
import { TiposSensoresOrmEntity } from "../tipos_sensores/infrastructure/persistence/tipos_sensores.orm-entity";
import { IotGlobalConfigPersistence } from "../iot_global_config/infrastructure/persistence/iot_global_config.orm-entity";
import { MonitoreoIotService } from "./application/monitoreo.service";
import { AlertasController, ConfigIotController, LecturasController, SensoresController } from "./infrastructure/monitoreo.controllers";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SensorOrmEntity,
      SensorLecturasOrmEntity,
      SensorAlertasPersistence,
      TiposSensoresOrmEntity,
      IotGlobalConfigPersistence,
    ]),
  ],
  controllers: [SensoresController, LecturasController, AlertasController, ConfigIotController],
  providers: [MonitoreoIotService],
})
export class MonitoreoIotModule {}
