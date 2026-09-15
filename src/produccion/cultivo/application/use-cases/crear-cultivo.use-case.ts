import { Injectable } from "@nestjs/common";
import { CultivoRepositoryPort } from "../ports/cultivo.repository.port";
import { CrearCultivoDto } from "../dto/crear-cultivo.dto";
import { Cultivo } from "../../domain/entities/cultivo.entity";

@Injectable()
export class CrearCultivoUseCase {
  constructor(private readonly cultivoRepository: CultivoRepositoryPort) {}

  async execute(dto: CrearCultivoDto): Promise<Cultivo> {
    const nuevo = new Cultivo();
    Object.assign(nuevo, dto);
    nuevo.estado = dto.estado ?? "activo";
    return await this.cultivoRepository.save(nuevo);
  }
}
