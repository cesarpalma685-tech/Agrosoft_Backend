import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CrearTipoFormacionUseCase } from '../../application/use-cases/crear-tipo-formacion.usecase';
import { ActualizarTipoFormacionUseCase } from '../../application/use-cases/actualizar-tipo-formacion.usecase';
import { EliminarTipoFormacionUseCase } from '../../application/use-cases/eliminar-tipo-formacion.usecase';
import { CreateTipoFormacionDto } from './dto/create-tipo-formacion.dto';
import { UpdateTipoFormacionDto } from './dto/update-tipo-formacion.dto';

@Controller('tipos-formacion')
export class TiposFormacionController {
  constructor(
    private readonly crearTipo: CrearTipoFormacionUseCase,
    private readonly actualizarTipo: ActualizarTipoFormacionUseCase,
    private readonly eliminarTipo: EliminarTipoFormacionUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateTipoFormacionDto) {
    return this.crearTipo.ejecutar(dto);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTipoFormacionDto) {
    return this.actualizarTipo.ejecutar(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.eliminarTipo.ejecutar(id);
  }
}
