import { Body, Controller, Delete, Param, ParseIntPipe, Patch, Post,} from '@nestjs/common';

import { CrearClienteUseCase } from '../application/use-cases/crear-cliente.usecase';
import { ActualizarClienteUseCase } from '../application/use-cases/actualizar-cliente.usecase';
import { EliminarClienteUseCase } from '../application/use-cases/eliminar-cliente.usecase';

import { CreateClienteDto } from './http/dto/create-cliente.dto';
import { UpdateClienteDto } from './http/dto/update-cliente.dto';

@Controller('clientes')
export class ClientesController {
  constructor(
    private readonly crearCliente: CrearClienteUseCase,
    private readonly actualizarCliente: ActualizarClienteUseCase,
    private readonly eliminarCliente: EliminarClienteUseCase,
  ) {}

  @Post()
  crear(
    @Body() dto: CreateClienteDto,
  ) {
    return this.crearCliente.ejecutar(dto);
  }

  @Patch(':id')
  actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateClienteDto,
  ) {
    return this.actualizarCliente.ejecutar(id, dto);
  }

  @Delete(':id')
  eliminar(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.eliminarCliente.ejecutar(id);
  }
}