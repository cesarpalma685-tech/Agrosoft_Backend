import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LoteProduccionController } from "./infrastructure/controllers/lote-produccion.controller";
import { CrearLoteProduccionUseCase } from "./application/use-cases/crear-lote-produccion.use-case";
import { ListarLoteProduccionUseCase } from "./application/use-cases/listar-lote-produccion.use-case";
import { LoteProduccionRepositoryPort } from "./application/ports/lote-produccion.repository.port";
import { LoteProduccionTypeOrmRepository } from "./infrastructure/repositories/lote-produccion.typeorm.repository";
import { LoteProduccionOrmEntity } from "./infrastructure/persistence/lote-produccion.orm-entity";

@Module({
  imports: [TypeOrmModule.forFeature([LoteProduccionOrmEntity])],
  controllers: [LoteProduccionController],
  providers: [
    CrearLoteProduccionUseCase,
    ListarLoteProduccionUseCase,
    {
      provide: LoteProduccionRepositoryPort,
      useClass: LoteProduccionTypeOrmRepository,
    },
  ],
  exports: [LoteProduccionRepositoryPort],
})
export class LoteProduccionModule {}
