import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SensorOrmEntity } from "./infrastructure/persistence/sensores.orm-entity";
import { SensorRepositoryPort } from "./application/ports/sensores.repository.port";
import { SensorTypeormRepository } from "./infrastructure/repositories/sensores.typeorm.repository";

// Las rutas de los sensores las atiende el módulo de monitoreo (iot/monitoreo).
@Module({
  imports: [TypeOrmModule.forFeature([SensorOrmEntity])],
  providers: [{ provide: SensorRepositoryPort, useClass: SensorTypeormRepository }],
  exports: [SensorRepositoryPort],
})
export class SensoresModule {}
