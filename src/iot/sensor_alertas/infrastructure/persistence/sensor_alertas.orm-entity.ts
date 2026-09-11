import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("sensor_alertas")
export class SensorAlertasPersistence {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date | null;

  @Column()
  sensor_id!: number;

  @Column("double precision")
  valor!: number;

  @Column("double precision")
  umbral!: number;

  @Column({ length: 10 })
  tipo!: string;

  @Column()
  fecha_alerta!: Date;

  @Column()
  lote_id!: number;

  @Column()
  sub_lote_id!: number;
}
