import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { InsumoOrmEntity } from "./infrastructure/persistence/insumo.orm-entity";
import { InsumoController } from "./infrastructure/controllers/insumos.controller";
import { CrearInsumoUseCase } from "./application/use-cases/crear-insumo.use-case";
import { ListarInsumosUseCase } from "./application/use-cases/listar-insumos.use-case";
import { InsumoRepositoryPort } from "./application/ports/insumo.repository.port";
import { InsumoTypeOrmRepository } from "./infrastructure/repositories/insumo.typeorm.repository";
import { ObtenerInsumoPorIdUseCase } from "./application/use-cases/obtener-insumo.use-case";
import { ActualizarInsumoUseCase } from "./application/use-cases/actualizar-insumo.use-case";
import { EliminarInsumoUseCase } from "./application/use-cases/eliminar-insumo.use-case";

@Module({
  imports: [TypeOrmModule.forFeature([InsumoOrmEntity])],
  controllers: [InsumoController],
  providers: [
    CrearInsumoUseCase,
    ListarInsumosUseCase,
    ObtenerInsumoPorIdUseCase,
    ActualizarInsumoUseCase,
    EliminarInsumoUseCase,

    {
      provide: InsumoRepositoryPort,
      useClass: InsumoTypeOrmRepository,
    },
  ],
  exports: [InsumoRepositoryPort],
})
export class InsumoModule {}
