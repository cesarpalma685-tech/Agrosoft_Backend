import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Notificacion } from '../../domain/entities/notificaciones.entity';
import { NotificacionRepository } from '../../aplication/ports/notificaciones.repository';

export interface ActualizarNotificacionInput {
  usuarioId?: number;
  titulo?: string;
  mensaje?: string;
  leida?: boolean;
  tipo?: string;
  metadata?: Record<string, any>;
}

@Injectable()
export class ActualizarNotificacionUseCase {
  constructor(
    private readonly repository: NotificacionRepository,
  ) {}

  async ejecutar(
    id: number,
    datos: ActualizarNotificacionInput,
  ): Promise<Notificacion> {
    const existente = await this.repository.buscarPorId(id);

    if (!existente) {
      throw new NotFoundException(
        'Notificación no encontrada',
      );
    }

    const notificacion = new Notificacion(
      existente.id,
      datos.usuarioId ?? existente.usuarioId,
      datos.titulo ?? existente.titulo,
      datos.mensaje ?? existente.mensaje,
      datos.leida ?? existente.leida,
      datos.tipo ?? existente.tipo,
      datos.metadata ?? existente.metadata,
      existente.createdAt,
    );

    return this.repository.actualizar(notificacion);
  }
}