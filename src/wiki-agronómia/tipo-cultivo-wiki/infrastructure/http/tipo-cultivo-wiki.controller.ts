import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTipoCultivoWikiUseCase } from '../../application/create-tipo-cultivo-wiki.use-case';
import { ListTipoCultivoWikiUseCase } from '../../application/list-tipo-cultivo-wiki.use-case';
import { CreateTipoCultivoWikiDto } from './dto/create-tipo-cultivo-wiki.dto';

@Controller('tipos-cultivos-wiki')
export class TipoCultivoWikiController {
  constructor(
    private readonly createTipoCultivoWikiUseCase: CreateTipoCultivoWikiUseCase,
    private readonly listTipoCultivoWikiUseCase: ListTipoCultivoWikiUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateTipoCultivoWikiDto) {
    return this.createTipoCultivoWikiUseCase.execute(dto);
  }

  @Get()
  async list() {
    return this.listTipoCultivoWikiUseCase.execute();
  }
}