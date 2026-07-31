import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateEpaUseCase } from '../../application/create-epa.use-case';
import { ListEpaUseCase } from '../../application/list-epa.use-case';
import { AsociarTiposCultivoEpaUseCase } from '../../application/asociar-tipos-cultivo-epa.use-case';
import { CreateEpaDto } from './dto/create-epa.dto';
import { AsociarTiposCultivoEpaDto } from './dto/asociar-tipos-cultivo-epa.dto';

@Controller('epas')
export class EpaController {
  constructor(
    private readonly createEpaUseCase: CreateEpaUseCase,
    private readonly listEpaUseCase: ListEpaUseCase,
    private readonly asociarTiposCultivoEpaUseCase: AsociarTiposCultivoEpaUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateEpaDto) {
    return this.createEpaUseCase.execute(dto);
  }

  @Get()
  async list() {
    return this.listEpaUseCase.execute();
  }

  @Post(':id/tipos-cultivo')
  async asociarTiposCultivo(
    @Param('id') id: string,
    @Body() dto: AsociarTiposCultivoEpaDto,
  ) {
    await this.asociarTiposCultivoEpaUseCase.execute(+id, dto.tipoCultivoWikiIds);
    return { message: 'Tipos de cultivo asociados correctamente' };
  }
}