import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { ListarActividadServiciosUseCase } from "../../application/use-cases/listar-servicios-por-actividad.use-case";
import { ActividadServicio } from "../../domain/entities/actividad-servicio.entity";

// El alta de servicios vive en ActividadController (POST /actividades/:id/servicios):
// además de guardar el servicio suma su costo al cultivo.
@Controller("actividades/:actividadId/servicios")
export class ActividadServicioController {
  constructor(private readonly listarUseCase: ListarActividadServiciosUseCase) {}

  @Get()
  async obtenerTodos(@Param("actividadId", ParseIntPipe) actividadId: number): Promise<ActividadServicio[]> {
    return await this.listarUseCase.execute(actividadId);
  }
}
