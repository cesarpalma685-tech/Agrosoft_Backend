import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CultivoHistorialController } from "./infrastructure/controllers/cultivo-historial.controller";
import { CrearCultivoHistorialUseCase } from "./application/use-cases/crear-cultivo-historial.use-case";
import { ListarCultivoHistorialUseCase } from "./application/use-cases/listar-cultivo-historial.use-case";
import { CultivoHistorialRepositoryPort } from "./application/ports/cultivo-historial.repository.port";
import { CultivoHistorialTypeOrmRepository } from "./infrastructure/repositories/cultivo-historial.typeorm.repository";
import { CultivoHistorialOrmEntity } from "./infrastructure/persistence/cultivo-historial.orm-entity";

@Module({
  imports: [TypeOrmModule.forFeature([CultivoHistorialOrmEntity])],
  controllers: [CultivoHistorialController],
  providers: [
    CrearCultivoHistorialUseCase,
    ListarCultivoHistorialUseCase,
    {
      provide: CultivoHistorialRepositoryPort,
      useClass: CultivoHistorialTypeOrmRepository,
    },
  ],
  exports: [CultivoHistorialRepositoryPort],
})
export class CultivoHistorialModule {}
