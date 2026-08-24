import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProveedoresController } from './infrastructure/controllers/proveedores-controller';
import { ProveedoresPersistence } from './infrastructure/persistence/proveedores.orm-entity';
import { ProveedoresRepository } from './repositories/proveedores.typeorm.repository';
import { CrearProveedoresUseCase } from './application/use-cases/crear-proveedores.use-case';
import { ListarProveedoresUseCase } from './application/use-cases/listar-proveedores.use-case';
import { ActualizarProveedoresUseCase } from './application/use-cases/actualizar-proveedores.use-case';
import { EliminarProveedoresUseCase } from './application/use-cases/eliminar-proveedores-por-id.use-case';
import {ObtenerProveedoresUseCase} from './application/use-cases/obtener-proveedores-por-id.use-case'

import { ProveedoresRepositoryPort } from './application/ports/proveedores.repository.port';
@Module({
  imports: [
    TypeOrmModule.forFeature([ProveedoresPersistence]),
  ],
  controllers: [
    ProveedoresController,
  ],
  providers: [
    CrearProveedoresUseCase,
    ListarProveedoresUseCase,
    ObtenerProveedoresUseCase,
    ActualizarProveedoresUseCase,
    EliminarProveedoresUseCase,

    ProveedoresRepository,
    {
      provide: ProveedoresRepositoryPort,
      useExisting: ProveedoresRepository,
    },
  ],
  exports: [
    ProveedoresRepositoryPort,
  ],
})
export class ProveedoresModule {}