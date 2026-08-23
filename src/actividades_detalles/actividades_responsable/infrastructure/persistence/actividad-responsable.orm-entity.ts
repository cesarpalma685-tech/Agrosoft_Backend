import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('actividades_responsables')
export class ActividadResponsableOrmEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id!: number;

  @Column({ name: 'actividad_id', type: 'integer' })
  actividadId!: number;

  @Column({ name: 'persona_id', type: 'integer' })
  personaId!: number;

  @Column({ type: 'varchar', length: 100, nullable: true, default: 'Supervisor' })
  rol?: string;

  @Column({ type: 'text', nullable: true })
  observaciones?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt?: Date;
}
