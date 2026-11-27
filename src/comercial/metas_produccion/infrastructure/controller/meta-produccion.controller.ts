import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { MetasProduccionUseCases } from "../../application/use-cases/metas.use-cases";
import { DefinirMetaDto } from "../../application/dto/definir-meta.dto";
import { JwtAuthGuard } from "../../../../identidad/usuarios/infraestructure/security/jwt-auth.guard";

@Controller("metas-produccion")
export class MetaProduccionController {
  constructor(private readonly metas: MetasProduccionUseCases) {}

  // Cada meta con sus ventas por mes, el acumulado y el porcentaje de avance (RF9.5)
  @Get()
  avance() {
    return this.metas.avance();
  }

  // PROTEGIDO: crea o actualiza la meta anual de una unidad productiva
  @UseGuards(JwtAuthGuard)
  @Post()
  definir(@Body() dto: DefinirMetaDto, @Req() req: { user: { userId: number | string } }) {
    return this.metas.definir(dto, Number(req.user.userId));
  }
}
