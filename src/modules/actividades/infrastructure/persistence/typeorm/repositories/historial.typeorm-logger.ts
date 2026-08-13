import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import type {
  HistorialLoggerPort,
  RegistrarHistorialInput,
  RegistroHistorial,
} from '../../../../domain/ports/historial-logger.port';
import { HistorialOrmEntity } from '../entities/historial.orm-entity';

@Injectable()
export class HistorialTypeOrmLogger implements HistorialLoggerPort {
  constructor(
    @InjectRepository(HistorialOrmEntity)
    private readonly repo: Repository<HistorialOrmEntity>,
  ) {}

  async registrar(input: RegistrarHistorialInput): Promise<void> {
    const registro = this.repo.create({
      actividadId: input.actividadId,
      usuarioId: input.usuarioId,
      motivo: input.motivo,
      cambios: input.cambios,
    });
    await this.repo.save(registro);
  }

  async listarPorActividad(actividadId: number): Promise<RegistroHistorial[]> {
    const items = await this.repo.find({
      where: { actividadId },
      order: { createdAt: 'DESC' },
    });

    return items.map((item) => ({
      id: item.id,
      actividadId: item.actividadId,
      usuarioId: item.usuarioId,
      motivo: item.motivo,
      cambios: item.cambios,
      createdAt: item.createdAt,
    }));
  }
}