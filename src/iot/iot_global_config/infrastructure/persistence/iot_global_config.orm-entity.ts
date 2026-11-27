import { SensorOrmEntity } from 'src/iot/sensores/infrastructure/persistence/sensores.orm-entity';
import { LoteOrmEntity } from 'src/territorio/lotes/infrastructure/persistence/lote.orm-entity';
import { SubloteOrmEntity } from 'src/territorio/sublotes/infrastructure/persistence/sublote.orm-entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";


@Entity("iot_global_config")

export class IotGlobalConfigPersistence {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date | null;

  @Column()
  name!: string;

  @Column()
  broker!: string;

  @Column()
  port!: number;

  @Column()
  protocol!: string;

  @Column({ default: '' })
  topic_prefix!: string;

  @Column({ type: 'text', default: '' })
  default_topics!: string;

  @Column({ type: 'text', default: '' })
  custom_topics!: string;

  @Column({ type: 'integer', nullable: true })
  lote_id!: number | null;

  @ManyToOne(() => LoteOrmEntity, (lote) => lote.iotConfigs, { nullable: true })
  @JoinColumn({ name: 'lote_id' })
  lote!: LoteOrmEntity;

  @Column({ type: 'integer', nullable: true })
  sub_lote_id!: number | null;

  @ManyToOne(() => SubloteOrmEntity, (sublote) => sublote.iotConfigs, { nullable: true })
  @JoinColumn({ name: 'sub_lote_id' })
  sublote!: SubloteOrmEntity;

  @Column({ default: '' })
  username!: string;

  // Cifrada (AES-256-GCM): el broker la necesita en claro, por eso no es un hash. Nunca sale en las respuestas.
  @Column({ type: 'text', default: '' })
  password!: string;

  @Column({ default: true })
  activo!: boolean;

  @Column({ default: false })
  default_sensors_initialized!: boolean;

  @Column({ default: false })
  auto_discover!: boolean;

@OneToMany(() => SensorOrmEntity, (sensor: SensorOrmEntity) => sensor.lote)
sensores!: SensorOrmEntity[];
}
