import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ClienteOrmEntity } from './infrastructure/persistence/cliente.orm-entity';
import { ClienteTypeOrmRepository } from './infrastructure/persistence/cliente-typeorm.repository';

import { ClienteRepository } from './domain/cliente.repository';

import { ClientesController } from './infrastructure/clientes.controller';

import { CrearClienteUseCase } from './application/use-cases/crear-cliente.usecase';
import { ActualizarClienteUseCase } from './application/use-cases/actualizar-cliente.usecase';
import { EliminarClienteUseCase } from './application/use-cases/eliminar-cliente.usecase';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ClienteOrmEntity,
    ]),
  ],
  controllers: [
    ClientesController,
  ],
  providers: [
    CrearClienteUseCase,
    ActualizarClienteUseCase,
    EliminarClienteUseCase,
    {
      provide: ClienteRepository,
      useClass: ClienteTypeOrmRepository,
    },
  ],
  exports: [
    ClienteRepository,
  ],
})
export class ClienteModule {}