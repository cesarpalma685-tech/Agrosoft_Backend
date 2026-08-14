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

import { CrearIotGlobalConfigUseCase } from '../../application/use-cases/crear-iot_global_config.use-case';
import { ListarIotGlobalConfigUseCase } from '../../application/use-cases/listar-iot_global_config.use-case';
import { ObtenerIotGlobalConfigUseCase } from '../../application/use-cases/obtener-iot_global_config-por-id.use-case';
import { ActualizarIotGlobalConfigUseCase } from '../../application/use-cases/actualizar-iot_global_config.use-case';
import { EliminarIotGlobalConfigUseCase } from '../../application/use-cases/eliminar-iot_global_config-por-id.use-case';

import { CrearIotGlobalConfigDto } from '../../application/dto/crear-iot_global_config.dto';

@Controller('iot_global_config')
export class IotGlobalConfigController {
  constructor(
    private readonly crearUseCase: CrearIotGlobalConfigUseCase,
    private readonly listarUseCase: ListarIotGlobalConfigUseCase,
    private readonly obtenerUseCase: ObtenerIotGlobalConfigUseCase,
    private readonly actualizarUseCase: ActualizarIotGlobalConfigUseCase,
    private readonly eliminarUseCase: EliminarIotGlobalConfigUseCase,
  ) {}

  @Post()
  crear(@Body() datos: CrearIotGlobalConfigDto) {
    return this.crearUseCase.execute(datos);
  }

  @Get()
  listar() {
    return this.listarUseCase.execute();
  }

  @Get(':id')
  obtener(@Param('id', ParseIntPipe) id: number) {
    return this.obtenerUseCase.execute(id);
  }

  @Patch(':id')
  actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() datos: Partial<CrearIotGlobalConfigDto>,
  ) {
    return this.actualizarUseCase.execute(id, datos);
  }

  @Delete(':id')
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.eliminarUseCase.execute(id);
  }
}