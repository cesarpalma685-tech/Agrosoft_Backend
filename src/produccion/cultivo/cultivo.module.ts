import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CultivoController } from "./infrastructure/controllers/cultivo.controller";
import { CrearCultivoUseCase } from "./application/use-cases/crear-cultivo.use-case";
import { ListarCultivoUseCase } from "./application/use-cases/listar-cultivo.use-case";
import { CultivoRepositoryPort } from "./application/ports/cultivo.repository.port";
import { CultivoTypeOrmRepository } from "./infrastructure/repositories/cultivo.typeorm.repository";
import { CultivoOrmEntity } from "./infrastructure/persistence/cultivo.orm-entity";

@Module({
  imports: [TypeOrmModule.forFeature([CultivoOrmEntity])],
  controllers: [CultivoController],
  providers: [
    CrearCultivoUseCase,
    ListarCultivoUseCase,
    { provide: CultivoRepositoryPort, useClass: CultivoTypeOrmRepository },
  ],
  exports: [CultivoRepositoryPort],
})
export class CultivoModule {}
