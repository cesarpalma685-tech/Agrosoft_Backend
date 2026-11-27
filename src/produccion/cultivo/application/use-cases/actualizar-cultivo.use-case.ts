import { Injectable, NotFoundException } from "@nestjs/common";
import { CultivoRepositoryPort } from "../ports/cultivo.repository.port";
import { CultivoHistorialRepositoryPort } from "../../../cultivo-historial/application/ports/cultivo-historial.repository.port";
import { CultivoHistorial } from "../../../cultivo-historial/domain/entities/cultivo-historial.entity";
import { ActualizarCultivoDto } from "../dto/actualizar-cultivo.dto";
import { Cultivo } from "../../domain/entities/cultivo.entity";

@Injectable()
export class ActualizarCultivoUseCase {
  constructor(
    private readonly cultivoRepository: CultivoRepositoryPort,
    private readonly historialRepository: CultivoHistorialRepositoryPort,
  ) {}

  async execute(id: number, dto: ActualizarCultivoDto, usuarioId?: number): Promise<Cultivo> {
    const actual = await this.cultivoRepository.findById(id);
    if (!actual) throw new NotFoundException(`El cultivo con ID ${id} no existe para actualizar`);

    const { motivo, ...campos } = dto;
    const cambios: Record<string, { antes: unknown; despues: unknown }> = {};
    const aplicar: Record<string, unknown> = {};

    for (const [campo, nuevo] of Object.entries(campos)) {
      if (nuevo === undefined) continue;
      const antes = (actual as unknown as Record<string, unknown>)[campo] ?? null;
      if (String(antes) === String(nuevo)) continue;
      cambios[campo] = { antes, despues: nuevo };
      aplicar[campo] = nuevo;
    }

    if (Object.keys(aplicar).length === 0) return actual;

    const actualizado = await this.cultivoRepository.update(id, aplicar as Partial<Cultivo>);
    if (!actualizado) throw new NotFoundException(`No se pudo actualizar el cultivo con ID ${id}`);

    // Quién cambió qué, cuándo y por qué (RF4.2 / RF4.4)
    const registro = new CultivoHistorial();
    Object.assign(registro, { cultivoId: id, usuarioId, motivo, cambios });
    await this.historialRepository.save(registro);

    return actualizado;
  }
}
