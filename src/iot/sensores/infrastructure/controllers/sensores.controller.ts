import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { CrearSensorUseCase } from '../../application/use-cases/crear-sensores.use-case';
import { ActualizarSensorUseCase } from '../../application/use-cases/actualizar-sensores.use-case';
import { EliminarSensorUseCase } from '../../application/use-cases/eliminar-sensores-por-id.use-case';
import { ListarSensoresUseCase } from '../../application/use-cases/listar-sensores.use-case';

import { CrearSensorDto } from '../../application/dto/crear-sensores.dto';

@Controller('sensores')
export class SensorController {
  constructor(
    private readonly crearSensorUseCase: CrearSensorUseCase,
    private readonly actualizarSensorUseCase: ActualizarSensorUseCase,
    private readonly eliminarSensorUseCase: EliminarSensorUseCase,
    private readonly listarSensoresUseCase: ListarSensoresUseCase,
  ) {}

  @Post()
  async crear(@Body() dto: CrearSensorDto) {
    return await this.crearSensorUseCase.execute(dto);
  }

  @Get()
  async listar() {
    return await this.listarSensoresUseCase.execute();
  }

  @Patch(':id')
  async actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() datos: Partial<CrearSensorDto>,
  ) {
    return await this.actualizarSensorUseCase.execute(id, datos);
  }

  @Delete(':id')
  async eliminar(@Param('id', ParseIntPipe) id: number) {
    return await this.eliminarSensorUseCase.execute(id);
  }
}