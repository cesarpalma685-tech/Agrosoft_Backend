import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
  ParseIntPipe,
  Req,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "../../../../identidad/usuarios/infraestructure/security/jwt-auth.guard";
import { CrearInsumoUseCase } from "../../application/use-cases/crear-insumo.use-case";
import { ActualizarInsumoDto, CrearInsumoDto } from "../../application/dto/crear-insumo.dto";
import { ListarInsumosUseCase } from "../../application/use-cases/listar-insumos.use-case";
import { ObtenerInsumoPorIdUseCase } from "../../application/use-cases/obtener-insumo.use-case";
import { ActualizarInsumoUseCase } from "../../application/use-cases/actualizar-insumo.use-case";
import { EliminarInsumoUseCase } from "../../application/use-cases/eliminar-insumo.use-case";
@Controller("insumos")
export class InsumoController {
  constructor(
    private readonly crearInsumoUseCase: CrearInsumoUseCase,
    private readonly obtenerInsumosUseCase: ListarInsumosUseCase,
    private readonly obtenerInsumoPorIdUseCase: ObtenerInsumoPorIdUseCase,
    private readonly actualizarInsumoUseCase: ActualizarInsumoUseCase,
    private readonly eliminarInsumoUseCase: EliminarInsumoUseCase,
  ) {}

  // 1. Crear
  // PROTEGIDO: el token dice quién registró el insumo
  @UseGuards(JwtAuthGuard)
  @Post()
  async crear(
    @Body() dto: CrearInsumoDto,
    @Req() req: { user: { userId: number | string } },
  ) {
    return await this.crearInsumoUseCase.execute(dto, Number(req.user.userId));
  }

  // 2. Obtener Todos
  @Get()
  async obtenerTodos() {
    return await this.obtenerInsumosUseCase.execute();
  }

  // 3. Obtener Solo Uno por ID
  @Get(":id")
  async obtenerPorId(@Param("id", ParseIntPipe) id: number) {
    return await this.obtenerInsumoPorIdUseCase.execute(id);
  }

  // 4. Actualizar por ID
  @Put(":id")
  async actualizar(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: ActualizarInsumoDto,
  ) {
    return await this.actualizarInsumoUseCase.execute(id, dto);
  }

  // 5. Eliminar por ID
  @Delete(":id")
  async eliminar(@Param("id", ParseIntPipe) id: number) {
    return await this.eliminarInsumoUseCase.execute(id);
  }
}
