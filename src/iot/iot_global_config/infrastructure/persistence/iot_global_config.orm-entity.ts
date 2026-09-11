import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
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

  @Column()
  lote_id!: number;

  @Column()
  sub_lote_id!: number;

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
}
