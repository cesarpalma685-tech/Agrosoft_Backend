import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ActividadController } from "./infrastructure/controllers/actividad.controller";
import { CrearActividadUseCase } from "./application/use-cases/crear-actividad.use-case";
import { ListarActividadUseCase } from "./application/use-cases/listar-actividad.use-case";
import { ActividadRepositoryPort } from "./application/ports/actividad.repository.port";
import { ActividadTypeOrmRepository } from "./infrastructure/repositories/actividad.typeorm.repository";
import { ActividadOrmEntity } from "./infrastructure/persistence/actividad.orm-entity";

@Module({
  imports: [TypeOrmModule.forFeature([ActividadOrmEntity])],
  controllers: [ActividadController],
  providers: [
    CrearActividadUseCase,
    ListarActividadUseCase,
    { provide: ActividadRepositoryPort, useClass: ActividadTypeOrmRepository },
  ],
  exports: [ActividadRepositoryPort],
})
export class ActividadModule {}
