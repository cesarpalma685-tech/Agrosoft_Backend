import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from "@nestjs/common";

import { CrearSensorLecturasUseCase } from "../../application/use-cases/crear-sensor_lecturas.use-case";
import { ActualizarSensorLecturasUseCase } from "../../application/use-cases/actualizar-sensor_lecturas.use-case";
import { EliminarSensorLecturasPorIdUseCase } from "../../application/use-cases/eliminar-sensor_lecturas-por-id.use-case";
import { ListarSensorLecturasUseCase } from "../../application/use-cases/listar-sensor_lecturas.use-case";
import { ObtenerSensorLecturasPorIdUseCase } from "../../application/use-cases/obtener-sensor_lecturas-por-id.use-case";

import { CrearSensorLecturasDto } from "../../application/dto/crear-sensor_lecturas.dto";
import { SensorLecturas } from "../../domain/entities/sensor_lecturas.dto";

@Controller("sensor-lecturas")
export class SensorLecturasController {
  constructor(
    private readonly crearSensorLecturaUseCase: CrearSensorLecturasUseCase,
    private readonly actualizarSensorLecturasUseCase: ActualizarSensorLecturasUseCase,
    private readonly eliminarSensorLecturaUseCase: EliminarSensorLecturasPorIdUseCase,
    private readonly listarSensorLecturasUseCase: ListarSensorLecturasUseCase,
    private readonly obtenerSensorLecturaPorIdUseCase: ObtenerSensorLecturasPorIdUseCase,
  ) {}

  @Post()
  async crear(@Body() dto: CrearSensorLecturasDto) {
    return await this.crearSensorLecturaUseCase.execute(dto);
  }

  @Get()
  async listar() {
    return await this.listarSensorLecturasUseCase.execute();
  }

  @Get(":id")
  async obtenerPorId(@Param("id", ParseIntPipe) id: number) {
    return await this.obtenerSensorLecturaPorIdUseCase.execute(id);
  }

  @Patch(":id")
  async actualizar(
    @Param("id", ParseIntPipe) id: number,
    @Body() datos: Partial<SensorLecturas>,
  ) {
    return await this.actualizarSensorLecturasUseCase.execute(id, datos);
  }

  @Delete(":id")
  async eliminar(@Param("id", ParseIntPipe) id: number) {
    return await this.eliminarSensorLecturaUseCase.execute(id);
  }
}
