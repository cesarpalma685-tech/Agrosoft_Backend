import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LoteProduccionController } from "./infrastructure/controllers/lote-produccion.controller";
import { CrearLoteProduccionUseCase } from "./application/use-cases/crear-lote-produccion.use-case";
import { ListarLoteProduccionUseCase } from "./application/use-cases/listar-lote-produccion.use-case";
import { ActualizarLoteProduccionUseCase } from "./application/use-cases/actualizar-lote-produccion.use-case";
import { EliminarLoteProduccionUseCase } from "./application/use-cases/eliminar-lote-produccion.use-case";
import { LoteProduccionRepositoryPort } from "./application/ports/lote-produccion.repository.port";
import { LoteProduccionTypeOrmRepository } from "./infrastructure/repositories/lote-produccion.typeorm.repository";
import { LoteProduccionOrmEntity } from "./infrastructure/persistence/lote-produccion.orm-entity";
import { CultivoModule } from "../cultivo/cultivo.module";
import { MovimientoProduccionModule } from "../movimiento-produccion/movimiento-produccion.module";
import { ProductosAgroModule } from "../../catalogos/productos_agro/productos_agro.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([LoteProduccionOrmEntity]),
    CultivoModule,
    MovimientoProduccionModule,
    ProductosAgroModule,
  ],
  controllers: [LoteProduccionController],
  providers: [
    CrearLoteProduccionUseCase,
    ListarLoteProduccionUseCase,
    ActualizarLoteProduccionUseCase,
    EliminarLoteProduccionUseCase,
    { provide: LoteProduccionRepositoryPort, useClass: LoteProduccionTypeOrmRepository },
  ],
  exports: [LoteProduccionRepositoryPort],
})
export class LoteProduccionModule {}
