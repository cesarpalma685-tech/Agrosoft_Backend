import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { NotificacionRepository } from '../../domain/notificaciones.repository';

@Injectable()
export class EliminarNotificacionUseCase {
  constructor(
    private readonly repository: NotificacionRepository,
  ) {}

  async ejecutar(id: number): Promise<void> {
    const existente = await this.repository.buscarPorId(id);

    if (!existente) {
      throw new NotFoundException(
        'Notificación no encontrada',
      );
    }

    await this.repository.eliminar(id);
  }
}