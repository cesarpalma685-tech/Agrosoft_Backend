import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ProductosAgroController } from "./infrastructure/controllers/productos_agro.controller";
import { ProductosAgroPersistence } from "./infrastructure/persistence/productos_agro.orm-entity";
import { ProductosAgroRepository } from "./infrastructure/repositories/productos.typeorm-repository";

import { CrearProductosAgroUseCase } from "./application/use-cases/crear-productos_agro.use-case";
import { ListarProductosAgroUseCase } from "./application/use-cases/listar-productos_agro.use-case";
import { ObtenerProductosAgroUseCase } from "./application/use-cases/obtener-productos_agro-por-id.use-case";
import { ActualizarProductosAgroUseCase } from "./application/use-cases/actualizar-productos_agro.use-case";
import { EliminarProductosAgroUseCase } from "./application/use-cases/eliminar-productos_agro-por-id.use-case";

import { ProductosAgroRepositoryPort } from "./application/ports/productos_agro-repository.port";

@Module({
  imports: [TypeOrmModule.forFeature([ProductosAgroPersistence])],
  controllers: [ProductosAgroController],
  providers: [
    CrearProductosAgroUseCase,
    ListarProductosAgroUseCase,
    ObtenerProductosAgroUseCase,
    ActualizarProductosAgroUseCase,
    EliminarProductosAgroUseCase,

    ProductosAgroRepository,
    {
      provide: ProductosAgroRepositoryPort,
      useExisting: ProductosAgroRepository,
    },
  ],
  exports: [ProductosAgroRepositoryPort],
})
export class ProductosAgroModule {}
