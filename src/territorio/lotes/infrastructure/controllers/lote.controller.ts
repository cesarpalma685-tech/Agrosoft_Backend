import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { CrearLoteDto } from '../../application/dto/crear-lote.dto';

import { CrearLoteUseCase } from '../../application/use-cases/crear-lote.use-case';
import { ListarLotesUseCase } from '../../application/use-cases/listar-lotes.use-case';
import { ObtenerLotePorIdUseCase } from '../../application/use-cases/obtener-lote-por-id.use-case';
import { ActualizarLoteUseCase } from '../../application/use-cases/actualizar-lote.use-case';
import { EliminarLoteUseCase } from '../../application/use-cases/eliminar-lote.use-case';

@Controller('lotes')
export class LoteController {
  constructor(
    private readonly crearLoteUseCase: CrearLoteUseCase,
    private readonly listarLotesUseCase: ListarLotesUseCase,
    private readonly obtenerLotePorIdUseCase: ObtenerLotePorIdUseCase,
    private readonly actualizarLoteUseCase: ActualizarLoteUseCase,
    private readonly eliminarLoteUseCase: EliminarLoteUseCase,
  ) {}

  @Post()
  crear(@Body() dto: CrearLoteDto) {
    return this.crearLoteUseCase.execute(dto);
  }

  @Get()
  listar() {
    return this.listarLotesUseCase.execute();
  }

  @Get(':id')
  obtenerPorId(@Param('id') id: string) {
    return this.obtenerLotePorIdUseCase.execute(Number(id));
  }

  @Put(':id')
  actualizar(
    @Param('id') id: string,
    @Body() dto: CrearLoteDto,
  ) {
    return this.actualizarLoteUseCase.execute(Number(id), dto);
  }

  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.eliminarLoteUseCase.execute(Number(id));
  }
};