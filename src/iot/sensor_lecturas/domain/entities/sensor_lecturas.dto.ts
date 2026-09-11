export class SensorLecturas {
  id!: number;
  sensor_id!: number;
  valor!: string;

  fecha_lectura!: Date;

  unidad!: string;
  observaciones?: string;

  created_at!: Date;
  updated_at!: Date;

  deleted_at?: Date | null;
}
