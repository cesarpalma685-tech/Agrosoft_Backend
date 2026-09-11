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

import { CrearSensorAlertasUseCase } from "../../application/use-cases/crear-sensor_alertas.use-case";
import { ListarSensorAlertasUseCase } from "../../application/use-cases/listar-sensor_alertas.use-case";
import { ObtenerSensorAlertasPorIdUseCase } from "../../application/use-cases/obtener-sensor_alertas-por-id.use-case";
import { ActualizarSensorAlertasUseCase } from "../../application/use-cases/actualizar-sensor_alertas.use-case";
import { EliminarSensorAlertasPorIdUseCase } from "../../application/use-cases/eliminar-sensor_alertas-por-id.use-case";

import { CrearSensorAlertasDto } from "../../application/dto/crear-sensor_alertas.dto";
@Controller("sensor-alertas")
export class SensorAlertasController {
  constructor(
    private readonly crearUseCase: CrearSensorAlertasUseCase,
    private readonly listarUseCase: ListarSensorAlertasUseCase,
    private readonly obtenerUseCase: ObtenerSensorAlertasPorIdUseCase,
    private readonly actualizarUseCase: ActualizarSensorAlertasUseCase,
    private readonly eliminarUseCase: EliminarSensorAlertasPorIdUseCase,
  ) {}

  @Post()
  crear(@Body() datos: CrearSensorAlertasDto) {
    return this.crearUseCase.execute(datos);
  }

  @Get()
  listar() {
    return this.listarUseCase.execute();
  }

  @Get(":id")
  obtener(@Param("id", ParseIntPipe) id: number) {
    return this.obtenerUseCase.execute(id);
  }

  @Patch(":id")
  actualizar(
    @Param("id", ParseIntPipe) id: number,
    @Body() datos: Partial<CrearSensorAlertasDto>,
  ) {
    return this.actualizarUseCase.execute(id, datos);
  }

  @Delete(":id")
  eliminar(@Param("id", ParseIntPipe) id: number) {
    return this.eliminarUseCase.execute(id);
  }
}
