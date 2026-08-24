import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('sensor_lecturas')
export class SensorLecturasOrmEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  sensor_id!: number;

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