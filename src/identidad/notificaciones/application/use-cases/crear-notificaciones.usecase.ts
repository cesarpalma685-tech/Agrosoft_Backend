import { Injectable } from '@nestjs/common';
import { Notificacion } from '../../domain/notificaciones.entity';
import { NotificacionRepository } from '../../domain/notificaciones.repository';

export interface CrearNotificacionInput {
  usuarioId: number;
  titulo: string;
  mensaje: string;
  leida?: boolean;
  tipo?: string;
  metadata?: Record<string, any>;
}

@Injectable()
export class CrearNotificacionUseCase {
constructor(
private readonly repository: NotificacionRepository,
) {}

async ejecutar(
datos: CrearNotificacionInput,): Promise<Notificacion> {
    const notificacion = new Notificacion(
      null,
      datos.usuarioId,
      datos.titulo,
      datos.mensaje,
      datos.leida ?? false,
      datos.tipo,
      datos.metadata,
      new Date(),
    );

    return this.repository.crear(notificacion);
  }
}