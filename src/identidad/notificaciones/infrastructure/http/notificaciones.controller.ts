import { Body, Controller, Delete, Param, ParseIntPipe, Patch, Post,} from '@nestjs/common';

import { CrearNotificacionUseCase } from '../../application/use-cases/crear-notificaciones.usecase';
import { ActualizarNotificacionUseCase } from '../../application/use-cases/actualizar-notificaciones.usecase';
import { EliminarNotificacionUseCase } from '../../application/use-cases/eliminar-notificaciones.usecase';

import { CreateNotificacionDto } from './dto/create-notificaciones.dto';
import { UpdateNotificacionDto } from './dto/update-notificaciones.dto';

@Controller('notificaciones')
export class NotificacionesController {
  constructor(
    private readonly crearNotificacion: CrearNotificacionUseCase,
    private readonly actualizarNotificacion: ActualizarNotificacionUseCase,
    private readonly eliminarNotificacion: EliminarNotificacionUseCase,
  ) {}

  @Post()
  crear(@Body() dto: CreateNotificacionDto) {
    return this.crearNotificacion.ejecutar(dto);
  }

  @Patch(':id')
  actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateNotificacionDto,
  ) {
    return this.actualizarNotificacion.ejecutar(id, dto);
  }

  @Delete(':id')
  eliminar(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.eliminarNotificacion.ejecutar(id);
  }
}