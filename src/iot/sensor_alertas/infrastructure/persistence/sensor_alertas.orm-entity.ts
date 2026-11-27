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

  @Column({ type: 'integer' })
  sensor_id!: number;


  @ManyToOne(() => SensorOrmEntity, (sensor: SensorOrmEntity) => sensor.alertas)
  @JoinColumn({ name: 'sensor_id' })
  sensor!: SensorOrmEntity;

  @Column('double precision')
  @Column("double precision")

  valor!: number;

  @Column("double precision")
  umbral!: number;

  @Column({ length: 10 })
  tipo!: string;

  @Column()
  fecha_alerta!: Date;

  @Column({ type: 'integer', nullable: true })
  lote_id!: number | null;

  @ManyToOne(() => LoteOrmEntity, (lote: LoteOrmEntity) => lote.alertas, { nullable: true })
  @JoinColumn({ name: 'lote_id' })
  lote!: LoteOrmEntity;

  @Column({ type: 'integer', nullable: true })
  sub_lote_id!: number | null;

  @ManyToOne(() => SubloteOrmEntity, (sublote: SubloteOrmEntity) => sublote.alertas, { nullable: true })
  @JoinColumn({ name: 'sub_lote_id' })
  sublote!: SubloteOrmEntity;
}
