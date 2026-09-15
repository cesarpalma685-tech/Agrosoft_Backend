import { Module } from "@nestjs/common";
import { AlmacenOrmEntity } from "./infrastructure/persistence/almacen.orm-entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AlmacenController } from "./infrastructure/controller/almacen.controller";
import { CrearAlmacenUseCase } from "./aplication/use-cases/crear-almacen.use-case";
import { AlmacenRepositoryPort } from "./aplication/ports/almacen.repository.port";
import { AlmacenTypeOrmRepository } from "./infrastructure/repositories/almacen.typeorm.repository";
import { ObtenerAlmacenesUseCase } from "./aplication/use-cases/listar-almacenes.use-case";
import { ObtenerAlmacenPorIdUseCase } from "./aplication/use-cases/obtener-almacen.use-case";
import { ActualizarAlmacenUseCase } from "./aplication/use-cases/actualizar-almacen.use-case";
import { EliminarAlmacenUseCase } from "./aplication/use-cases/eliminar-almacen.use-case";

@Module({
  imports: [TypeOrmModule.forFeature([AlmacenOrmEntity])],
  controllers: [AlmacenController],
  providers: [
    CrearAlmacenUseCase,
    ObtenerAlmacenesUseCase,
    ObtenerAlmacenPorIdUseCase,
    ActualizarAlmacenUseCase,
    EliminarAlmacenUseCase,

    { provide: AlmacenRepositoryPort, useClass: AlmacenTypeOrmRepository },
  ],
  exports: [AlmacenRepositoryPort],
})
export class AlmacenModule {}
