import { Body, Controller, Delete, Param, ParseIntPipe, Patch, Post,} from '@nestjs/common';

import { CrearNotificacionUseCase } from '../../../../src/notificaciones/aplication/use-cases/crear-notificaciones.usecase';
import { ActualizarNotificacionUseCase } from '../../../../src/notificaciones/aplication/use-cases/actualizar-notificaciones.usecase';
import { EliminarNotificacionUseCase } from '../../../../src/notificaciones/aplication/use-cases/eliminar-notificaciones.usecase';

import { CreateNotificacionDto } from '../../../../src/notificaciones/aplication/dto/create-notificaciones.dto';
import { UpdateNotificacionDto } from '../../../../src/notificaciones/aplication/dto/update-notificaciones.dto';

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