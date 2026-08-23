import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('actividades_herramientas')
export class ActividadHerramientaOrmEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id!: number;

  @Column({ name: 'actividad_id', type: 'integer' })
  actividadId!: number;

  @Column({ name: 'herramienta_id', type: 'integer' })
  herramientaId!: number;

  @Column({ type: 'integer', default: 1 })
  cantidad!: number;

  @Column({ type: 'text', nullable: true })
  observaciones?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt?: Date;
}
