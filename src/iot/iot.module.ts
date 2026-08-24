import { Module } from "@nestjs/common";
import { IotGlobalConfigModule } from "./iot_global_config/iot_global_config.module";
import { SensorAlertasModule } from "./sensor_alertas/sensor_alertas.module";
import { SensorLecturasModule } from "./sensor_lecturas/sensor_lecturas.module";
import { TiposSensoresModule } from "./tipos_sensores/tipos_sensores.module";
import { SensoresModule } from "./sensores/sensores.module";

@Module({
    imports: [ IotGlobalConfigModule, SensorAlertasModule, SensorLecturasModule ,  TiposSensoresModule, SensoresModule],

})
export class IotModule{}