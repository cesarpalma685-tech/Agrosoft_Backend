import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from "@nestjs/common";
import { CrearClienteUseCase } from "../../aplication/use-cases/crear-cliente.usecase";
import { ActualizarClienteUseCase } from "../../aplication/use-cases/actualizar-cliente.usecase";
import { EliminarClienteUseCase } from "../../aplication/use-cases/eliminar-cliente.usecase";
import { ListarClientesUseCase } from "../../aplication/use-cases/listar-clientes.usecase";
import { CreateClienteDto } from "../../aplication/dto/create-cliente.dto";
import { UpdateClienteDto } from "../../aplication/dto/update-cliente.dto";

@Controller("clientes")
export class ClientesController {
  constructor(
    private readonly crear: CrearClienteUseCase,
    private readonly actualizar: ActualizarClienteUseCase,
    private readonly eliminar: EliminarClienteUseCase,
    private readonly listar: ListarClientesUseCase,
  ) {}

  @Get()
  list() {
    return this.listar.ejecutar();
  }

  @Post()
  create(@Body() dto: CreateClienteDto) {
    return this.crear.ejecutar(dto);
  }

  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdateClienteDto) {
    return this.actualizar.ejecutar(id, dto);
  }

  @Delete(":id")
  async remove(@Param("id", ParseIntPipe) id: number) {
    try {
      await this.eliminar.ejecutar(id);
    } catch (error) {
      if ((error as { status?: number }).status === 404) throw error;
      // El cliente ya tiene ventas (llave foránea)
      throw new ConflictException("No se puede eliminar: el cliente tiene ventas registradas");
    }
  }
}
