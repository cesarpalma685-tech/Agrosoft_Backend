import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { EpaService } from "../../application/epa.service";
import { ActualizarEpaDto, CrearEpaDto } from "../../application/dto/crear-epa.dto";
import { JwtAuthGuard } from "../../../../identidad/usuarios/infraestructure/security/jwt-auth.guard";

@Controller("epas")
export class EpaController {
  constructor(private readonly servicio: EpaService) {}

  @Get()
  listar() {
    return this.servicio.listar();
  }

  @Get(":id")
  obtener(@Param("id", ParseIntPipe) id: number) {
    return this.servicio.obtener(id);
  }

  // PROTEGIDO: el token dice quién creó la ficha
  @UseGuards(JwtAuthGuard)
  @Post()
  crear(@Body() dto: CrearEpaDto, @Req() req: { user: { userId: number | string } }) {
    return this.servicio.crear(dto, Number(req.user.userId));
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  actualizar(@Param("id", ParseIntPipe) id: number, @Body() dto: ActualizarEpaDto) {
    return this.servicio.actualizar(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  eliminar(@Param("id", ParseIntPipe) id: number) {
    return this.servicio.eliminar(id);
  }
}
