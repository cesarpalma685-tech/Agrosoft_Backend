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

  @Column()
  topic_prefix!: string;

  @Column()
  default_topics!: string;

  @Column()
  custom_topics!: string;

  @Column({ insert: false, update: false })
  lote_id!: number;

  @ManyToOne(() => LoteOrmEntity, (lote) => lote.iotConfigs)
  @JoinColumn({ name: 'lote_id' })
  lote!: LoteOrmEntity;

  @Column({ insert: false, update: false })
  sub_lote_id!: number;

  @ManyToOne(() => SubloteOrmEntity, (sublote) => sublote.iotConfigs)
  @JoinColumn({ name: 'sub_lote_id' })
  sublote!: SubloteOrmEntity;

  @Column()
  username!: string;

  @Column()
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
