
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('sensores')
export class SensorOrmEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar' })
  nombre_sensor!: string;

  @Column({ type: 'integer' })
  tipo_sensor_id!: number;

  @Column({ type: 'varchar' })
  protocolo!: string;

  @Column({ type: 'varchar', nullable: true })
  endpoint_url!: string | null;

  @Column({ type: 'varchar', nullable: true })
  mqtt_topic!: string | null;

  @Column({ type: 'numeric', nullable: true })
  valor_minimo_sensor!: number | null;

  @Column({ type: 'numeric', nullable: true })
  valor_maximo_sensor!  : number | null;

  @Column({ type: 'boolean', default: true })
  activo!: boolean;

  @Column({ type: 'varchar', nullable: true })
  estado_conexion! : string | null;

  @Column({ type: 'varchar', nullable: true })
  estado!: string | null;

  @Column({ type: 'varchar', nullable: true })
  ultimo_valor!: string | null;

  @Column({ type: 'timestamp', nullable: true })
  ultima_medicion!: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  last_seen_at!: Date | null;

  @Column({ type: 'integer' })
  cultivoId! : number;

  @Column({ type: 'integer' })
  creadoPorUsuarioId!: number;

  @Column({ type: 'integer' })
  global_config_id!: number;

  @Column({ type: 'integer' })
  lote_id!: number;

  @Column({ type: 'integer' })
  sub_lote_id!: number;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at!: Date | null;
}