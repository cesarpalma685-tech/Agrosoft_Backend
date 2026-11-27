import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { ActividadRepositoryPort } from "../ports/actividad.repository.port";
import { CultivoRepositoryPort } from "../../../cultivo/application/ports/cultivo.repository.port";
import { ActividadServicioRepositoryPort } from "../../../../actividades_detalles/actividades_servicios/application/ports/actividad-servicio.repository.port";
import { ActividadServicio } from "../../../../actividades_detalles/actividades_servicios/domain/entities/actividad-servicio.entity";
import { RegistrarServicioDto } from "../dto/crear-actividad.dto";
import { ListarActividadUseCase } from "./listar-actividad.use-case";

@Injectable()
export class RegistrarServicioUseCase {
  constructor(
    private readonly actividadRepository: ActividadRepositoryPort,
    private readonly cultivoRepository: CultivoRepositoryPort,
    private readonly servicioRepository: ActividadServicioRepositoryPort,
    private readonly listar: ListarActividadUseCase,
  ) {}

  async execute(actividadId: number, dto: RegistrarServicioDto) {
    const actividad = await this.actividadRepository.findById(actividadId);
    if (!actividad) throw new NotFoundException(`La actividad con ID ${actividadId} no existe`);
    if (actividad.estado === "completada") {
      throw new BadRequestException("La actividad ya está completada: no se pueden agregar servicios");
    }

    const costo = Math.round((dto.horas * dto.precioHora + Number.EPSILON) * 100) / 100;
    const servicio = new ActividadServicio();
    Object.assign(servicio, {
      actividadId,
      maquinariaId: dto.maquinariaId ?? null,
      nombreServicio: dto.nombreServicio.trim(),
      horas: dto.horas,
      precioHora: dto.precioHora,
      costo,
    });
    await this.servicioRepository.save(servicio);

    // El costo del servicio se traslada al cultivo (RF5.10 / RF4.5)
    const cultivo = await this.cultivoRepository.findById(actividad.cultivoId);
    if (cultivo && costo > 0) {
      await this.cultivoRepository.update(cultivo.id, { costoTotal: Number(cultivo.costoTotal ?? 0) + costo });
    }
    return await this.listar.obtener(actividadId);
  }
}
