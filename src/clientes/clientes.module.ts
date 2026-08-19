import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ClienteOrmEntity } from '../../src/clientes/infraestructure/persistence/cliente.orm-entity';
import { ClienteTypeOrmRepository } from '../clientes/infraestructure/repositories/cliente-typeorm.repository';

import { ClienteRepository } from '../../src/clientes/aplication/ports/cliente.repository';

import { ClientesController } from '../../src/clientes/infraestructure/controllers/clientes.controller';

import { CrearClienteUseCase } from '../../src/clientes/aplication/use-cases/crear-cliente.usecase';
import { ActualizarClienteUseCase } from '../../src/clientes/aplication/use-cases/actualizar-cliente.usecase';
import { EliminarClienteUseCase } from '../../src/clientes/aplication/use-cases/eliminar-cliente.usecase';

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