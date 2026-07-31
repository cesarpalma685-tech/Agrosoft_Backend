import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { CrearReservaUseCase } from "../../aplication/use-cases/crear-reserva.use-case";
import { ListarReservasUseCase } from "../../aplication/use-cases/listar-reservas.use-case";
import { ObtenerReservaPorIdUseCase } from "../../aplication/use-cases/obtener-reserva.use-case";
import { ActualizarReservaUseCase } from "../../aplication/use-cases/actualizar-reserva.use-case";
import { EliminarReservaUseCase } from "../../aplication/use-cases/eliminar-reserva.use-case";
import { CrearReservaDto } from "../../aplication/dto/crear-reservas.dto";

@Controller('reservas')
export class ReservaController {
  constructor(
    private readonly crearUseCase: CrearReservaUseCase,
    private readonly listarUseCase: ListarReservasUseCase,
    private readonly obtenerPorIdUseCase: ObtenerReservaPorIdUseCase,
    private readonly actualizarUseCase: ActualizarReservaUseCase,
    private readonly eliminarUseCase: EliminarReservaUseCase,
  ) {}

  @Post()
  async crear(@Body() dto: CrearReservaDto) {
    return await this.crearUseCase.execute(dto);
  }

  @Get()
  async obtenerTodas() {
    return await this.listarUseCase.execute();
  }

  @Get(':id')
  async obtenerPorId(@Param('id', ParseIntPipe) id: number) {
    return await this.obtenerPorIdUseCase.execute(id);
  }

  @Put(':id')
  async actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: Partial<CrearReservaDto>,
  ) {
    return await this.actualizarUseCase.execute(id, dto);
  }

  @Delete(':id')
  async eliminar(@Param('id', ParseIntPipe) id: number) {
    return await this.eliminarUseCase.execute(id);
  }
}