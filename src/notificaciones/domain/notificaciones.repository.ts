import { Notificacion } from './notificaciones.entity';

export abstract class NotificacionRepository {
  abstract crear(notificacion: Notificacion): Promise<Notificacion>;
  abstract actualizar(notificacion: Notificacion): Promise<Notificacion>;
  abstract eliminar(id: number): Promise<void>;
  abstract buscarPorId(id: number): Promise<Notificacion | null>;
}