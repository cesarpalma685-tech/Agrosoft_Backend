import { Body, Controller, Get, Post } from "@nestjs/common";
import { CrearActividadUseCase } from "../../application/use-cases/crear-actividad.use-case";
import { ListarActividadUseCase } from "../../application/use-cases/listar-actividad.use-case";
import { CrearActividadDto } from "../../application/dto/crear-actividad.dto";

@Controller("actividades")
export class ActividadController {
  constructor(
    private readonly crearActividadUseCase: CrearActividadUseCase,
    private readonly listarActividadUseCase: ListarActividadUseCase,
  ) {}

  @Post()
  async crear(@Body() dto: CrearActividadDto) {
    return await this.crearActividadUseCase.execute(dto);
  }

  @Get()
  async listar() {
    return await this.listarActividadUseCase.execute();
  }
}
