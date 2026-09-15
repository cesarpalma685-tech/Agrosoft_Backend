import { SensorOrmEntity } from 'src/iot/sensores/infrastructure/persistence/sensores.orm-entity';

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';


@Entity('sensor_lecturas')
export class SensorLecturasOrmEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ insert: false, update: false })
  sensor_id!: number;

  @ManyToOne(() => SensorOrmEntity, (sensor: SensorOrmEntity) => sensor.lecturas)
  @JoinColumn({ name: 'sensor_id' })
  sensor!: SensorOrmEntity;

  @Column()
  valor!: string;

  @Column({ type: 'timestamptz' })
  fecha_lectura!: Date;

  @Column()
  unidad!: string;

  @Column({ type: 'text', nullable: true })
  observaciones!: string | null;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at!: Date | null;
}
