import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ClienteOrmEntity } from "./infraestructure/persistence/cliente.orm-entity";
import { ClienteTypeOrmRepository } from "./infraestructure/repositories/cliente-typeorm.repository";

import { ClienteRepository } from "./aplication/ports/cliente.repository";

import { ClientesController } from "./infraestructure/controllers/clientes.controller";

import { CrearClienteUseCase } from "./aplication/use-cases/crear-cliente.usecase";
import { ActualizarClienteUseCase } from "./aplication/use-cases/actualizar-cliente.usecase";
import { EliminarClienteUseCase } from "./aplication/use-cases/eliminar-cliente.usecase";

@Module({
  imports: [TypeOrmModule.forFeature([ClienteOrmEntity])],
  controllers: [ClientesController],
  providers: [
    CrearClienteUseCase,
    ActualizarClienteUseCase,
    EliminarClienteUseCase,
    {
      provide: ClienteRepository,
      useClass: ClienteTypeOrmRepository,
    },
  ],
  exports: [ClienteRepository],
})
export class ClienteModule {}
