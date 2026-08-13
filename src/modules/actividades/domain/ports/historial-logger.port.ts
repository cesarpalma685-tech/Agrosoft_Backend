export const HISTORIAL_LOGGER = 'HISTORIAL_LOGGER';

export interface RegistrarHistorialInput {
  actividadId: number;
  usuarioId: number;
  motivo: string;
  cambios: Record<string, any>;
}

export interface RegistroHistorial {
  id: number;
  actividadId: number;
  usuarioId: number;
  motivo: string;
  cambios: Record<string, any>;
  createdAt: Date;
}

export interface HistorialLoggerPort {
  registrar(input: RegistrarHistorialInput): Promise<void>;
  listarPorActividad(actividadId: number): Promise<RegistroHistorial[]>;
}