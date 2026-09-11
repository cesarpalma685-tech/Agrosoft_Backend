import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { SensorLecturasController } from "./infrastructure/controllers/sensor_lecturas.controller";

import { SensorLecturasOrmEntity } from "./infrastructure/persistence/sensor_lecturas.orm-entity";

import { SensorLecturasTypeormRepository } from "./infrastructure/repositories/sensor_lecturas.typeorm.repository";
import { SensorLecturasRepositoryPort } from "./application/ports/sensor_lecturas.repository.port";

import { CrearSensorLecturasUseCase } from "./application/use-cases/crear-sensor_lecturas.use-case";
import { ActualizarSensorLecturasUseCase } from "./application/use-cases/actualizar-sensor_lecturas.use-case";
import { EliminarSensorLecturasPorIdUseCase } from "./application/use-cases/eliminar-sensor_lecturas-por-id.use-case";
import { ListarSensorLecturasUseCase } from "./application/use-cases/listar-sensor_lecturas.use-case";
import { ObtenerSensorLecturasPorIdUseCase } from "./application/use-cases/obtener-sensor_lecturas-por-id.use-case";

@Module({
  imports: [TypeOrmModule.forFeature([SensorLecturasOrmEntity])],

  controllers: [SensorLecturasController],

  providers: [
    CrearSensorLecturasUseCase,
    ActualizarSensorLecturasUseCase,
    EliminarSensorLecturasPorIdUseCase,
    ListarSensorLecturasUseCase,
    ObtenerSensorLecturasPorIdUseCase,

    {
      provide: SensorLecturasRepositoryPort,
      useClass: SensorLecturasTypeormRepository,
    },
  ],

  exports: [SensorLecturasRepositoryPort],
})
export class SensorLecturasModule {}
