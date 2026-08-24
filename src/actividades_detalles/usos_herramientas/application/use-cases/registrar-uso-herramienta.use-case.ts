import { Injectable } from '@nestjs/common';
import { UsoHerramientaRepositoryPort } from '../ports/uso-herramienta.repository.port';
import { UsoHerramienta } from '../../domain/entities/uso-herramienta.entity';
import { RegistrarUsoHerramientaDto } from '../dto/uso_herramienta.dto';

@Injectable()
export class RegistrarUsoHerramientaUseCase {
  constructor(
    private readonly usoHerramientaRepository: UsoHerramientaRepositoryPort,
  ) {}

  async execute(dto: RegistrarUsoHerramientaDto): Promise<UsoHerramienta> {
    const nuevoUso = new UsoHerramienta();
    Object.assign(nuevoUso, dto);
    return await this.usoHerramientaRepository.save(nuevoUso);
  }
}
