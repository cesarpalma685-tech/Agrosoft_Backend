export class Sensor {
  id!: number;

  nombre_sensor!: string;

  codigo?: string | null;

  tipo_sensor_id!: number;

  protocolo!: string;

  endpoint_url?: string;

  mqtt_topic?: string;

  valor_minimo_sensor?: number;

  valor_maximo_sensor?: number;

  activo!: boolean;

  estado_conexion?: string;

  estado?: string;

  ultimo_valor?: string;

  ultima_medicion?: Date;

  last_seen_at?: Date;

  cultivoId?: number | null;

  creadoPorUsuarioId!: number;

  global_config_id?: number | null;

  lote_id?: number | null;

  sub_lote_id?: number | null;

  created_at?: Date;

  updated_at?: Date;

  deleted_at?: Date;
}
