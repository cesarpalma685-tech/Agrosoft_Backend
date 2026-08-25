import { Injectable } from '@nestjs/common';
import { UsoHerramientaRepositoryPort } from '../ports/uso-herramienta.repository.port';
import { UsoHerramienta } from '../../domain/entities/uso-herramienta.entity';
import { CrearUsoHerramientaDto } from '../dto/uso_herramienta.dto';

@Injectable()
export class CrearUsoHerramientaUseCase {
  constructor(
    private readonly usoHerramientaRepository: UsoHerramientaRepositoryPort,
  ) {}

  async execute(dto: CrearUsoHerramientaDto): Promise<UsoHerramienta> {
    const nuevoUso = new UsoHerramienta();
    nuevoUso.actividadId = dto.actividadId;
    nuevoUso.insumoId = dto.insumoId;
    nuevoUso.horasUsadas = dto.horasUsadas;
    nuevoUso.valorEnLibrosAntes = dto.valorEnLibrosAntes;
    nuevoUso.fechaUso = new Date();

    const depreciacion = dto.horasUsadas * dto.tasaDepreciacionPorHora;
    nuevoUso.depreciacionGenerada = depreciacion;
    nuevoUso.valorEnLibrosDespues = Math.max(
      0,
      dto.valorEnLibrosAntes - depreciacion,
    );

    return await this.usoHerramientaRepository.save(nuevoUso);
  }
}
