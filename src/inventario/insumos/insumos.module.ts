import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { InsumoOrmEntity } from "./infrastructure/persistence/insumo.orm-entity";
import { InsumoController } from "./infrastructure/controllers/insumos.controller";
import { CrearInsumoUseCase } from "./aplication/use-cases/crear-insumo.use-case";
import { ListarInsumosUseCase } from "./aplication/use-cases/listar-insumos.use-case";
import { InsumoRepositoryPort } from "./aplication/ports/insumo.repository.port";
import { InsumoTypeOrmRepository } from "./infrastructure/repositories/insumo.typeorm.repository";
import { ObtenerInsumoPorIdUseCase } from "./aplication/use-cases/obtener-insumo.use-case";
import { ActualizarInsumoUseCase } from "./aplication/use-cases/actualizar-insumo.use-case";
import { EliminarInsumoUseCase } from "./aplication/use-cases/eliminar-insumo.use-case";

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
