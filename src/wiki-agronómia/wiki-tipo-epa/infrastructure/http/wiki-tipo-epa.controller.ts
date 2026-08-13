import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateWikiTipoEpaUseCase } from '../../application/create-wiki-tipo-epa.use-case';
import { ListWikiTipoEpaUseCase } from '../../application/list-wiki-tipo-epa.use-case';
import { CreateWikiTipoEpaDto } from './dto/create-wiki-tipo-epa.dto';

@Controller('wiki-tipo-epa')
export class WikiTipoEpaController {
  constructor(
    private readonly createWikiTipoEpaUseCase: CreateWikiTipoEpaUseCase,
    private readonly listWikiTipoEpaUseCase: ListWikiTipoEpaUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateWikiTipoEpaDto) {
    return this.createWikiTipoEpaUseCase.execute(dto);
  }

  @Get()
  async list() {
    return this.listWikiTipoEpaUseCase.execute();
  }
}