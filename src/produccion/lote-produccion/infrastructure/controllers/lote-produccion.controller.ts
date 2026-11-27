import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { CrearLoteProduccionUseCase } from "../../application/use-cases/crear-lote-produccion.use-case";
import { ListarLoteProduccionUseCase } from "../../application/use-cases/listar-lote-produccion.use-case";
import { ActualizarLoteProduccionUseCase } from "../../application/use-cases/actualizar-lote-produccion.use-case";
import { EliminarLoteProduccionUseCase } from "../../application/use-cases/eliminar-lote-produccion.use-case";
import { ActualizarLoteProduccionDto, CrearLoteProduccionDto } from "../../application/dto/crear-lote-produccion.dto";
import { JwtAuthGuard } from "../../../../identidad/usuarios/infraestructure/security/jwt-auth.guard";

type ReqUsuario = { user: { userId: number | string } };

@Controller("lotes-produccion")
export class LoteProduccionController {
  constructor(
    private readonly crearLoteProduccionUseCase: CrearLoteProduccionUseCase,
    private readonly listarLoteProduccionUseCase: ListarLoteProduccionUseCase,
    private readonly actualizarUseCase: ActualizarLoteProduccionUseCase,
    private readonly eliminarUseCase: EliminarLoteProduccionUseCase,
  ) {}

  // PROTEGIDO: el token dice quién registró la cosecha
  @UseGuards(JwtAuthGuard)
  @Post()
  async crear(@Body() dto: CrearLoteProduccionDto, @Req() req: ReqUsuario) {
    return await this.crearLoteProduccionUseCase.execute(dto, Number(req.user.userId));
  }

  @Get()
  async listar() {
    return await this.listarLoteProduccionUseCase.execute();
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  async actualizar(@Param("id", ParseIntPipe) id: number, @Body() dto: ActualizarLoteProduccionDto, @Req() req: ReqUsuario) {
    return await this.actualizarUseCase.execute(id, dto, Number(req.user.userId));
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async eliminar(@Param("id", ParseIntPipe) id: number) {
    await this.eliminarUseCase.execute(id);
  }
}
