import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoriasController } from './infrastructure/controllers/categorias-controller';
import { CategoriasPersistence } from './infrastructure/persistence/categorias-orm-entity';
import { CategoriaRepository } from './infrastructure/repositories/categorias.typeorm.repository';

import {CategoriasRepositoryPort } from './application/ports/categorias-repository.port';

import { CrearCategoriasUseCase} from './application/use-cases/crear-categorias.use-case';
import { ListarCategoriasUseCase } from './application/use-cases/listar-categorias.use-case';
import { ObtenerCategoriaUseCase } from './application/use-cases/obtener-categorias-por-id.use-case';
import { ActualizarCategoriasUseCase } from './application/use-cases/actualizar-categorias.use-case';
import { EliminarCategoriaUseCase } from './application/use-cases/eliminar-categorias-por-id.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([CategoriasPersistence])],

  controllers: [CategoriasController],

  providers: [
    {
      provide:CategoriasRepositoryPort,
      useClass: CategoriaRepository,
    },

    CrearCategoriasUseCase,
    ListarCategoriasUseCase,
    ObtenerCategoriaUseCase,
    ActualizarCategoriasUseCase,
    EliminarCategoriaUseCase,
  ],

  exports: [CategoriasRepositoryPort],
})
export class CategoriasModule {}