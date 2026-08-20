import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { RegistrarEvidenciaUseCase } from '../../../application/use-cases/evidencias/registrar-evidencia.use-case';
import { ListarEvidenciasPorActividadUseCase } from '../../../application/use-cases/evidencias/listar-evidencias-por-actividad.use-case';
import { RegistrarEvidenciaDto } from '../dtos/registrar-evidencia.dto';

@Controller('actividades/:actividadId/evidencias')
export class EvidenciasController {
  constructor(
    private readonly registrarEvidencia: RegistrarEvidenciaUseCase,
    private readonly listarEvidencias: ListarEvidenciasPorActividadUseCase,
  ) {}

  @Post()
  crear(
    @Param('actividadId', ParseIntPipe) actividadId: number,
    @Body() dto: RegistrarEvidenciaDto,
  ) {
    return this.registrarEvidencia.execute({
      actividadId,
      ...dto,
    });
  }

  @Get()
  listarPorActividad(@Param('actividadId', ParseIntPipe) actividadId: number) {
    return this.listarEvidencias.execute(actividadId);
  }
}