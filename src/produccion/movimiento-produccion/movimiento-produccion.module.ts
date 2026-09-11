import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MovimientoProduccionController } from "./infrastructure/controllers/movimiento-produccion.controller";
import { CrearMovimientoProduccionUseCase } from "./application/use-cases/crear-movimiento-produccion.use-case";
import { ListarMovimientoProduccionUseCase } from "./application/use-cases/listar-movimiento-produccion.use-case";
import { MovimientoProduccionRepositoryPort } from "./application/ports/movimiento-produccion.repository.port";
import { MovimientoProduccionTypeOrmRepository } from "./infrastructure/repositories/movimiento-produccion.typeorm.repository";
import { MovimientoProduccionOrmEntity } from "./infrastructure/persistence/movimiento-produccion.orm-entity";
import { LoteProduccionOrmEntity } from "../lote-produccion/infrastructure/persistence/lote-produccion.orm-entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MovimientoProduccionOrmEntity,
      LoteProduccionOrmEntity,
    ]),
  ],
  controllers: [MovimientoProduccionController],
  providers: [
    CrearMovimientoProduccionUseCase,
    ListarMovimientoProduccionUseCase,
    {
      provide: MovimientoProduccionRepositoryPort,
      useClass: MovimientoProduccionTypeOrmRepository,
    },
  ],
  exports: [MovimientoProduccionRepositoryPort],
})
export class MovimientoProduccionModule {}
