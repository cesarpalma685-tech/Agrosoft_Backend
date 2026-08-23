import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('usos_herramientas')
export class UsoHerramientaOrmEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id!: number;

  @Column({ name: 'actividad_id', type: 'integer' })
  actividadId!: number;

  @Column({ name: 'herramienta_id', type: 'integer' })
  herramientaId!: number;

  @Column({ name: 'horas_uso', type: 'numeric', precision: 5, scale: 2, nullable: true })
  horasUso?: number;

  @Column({ type: 'text', nullable: true })
  observaciones?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt?: Date;
}
