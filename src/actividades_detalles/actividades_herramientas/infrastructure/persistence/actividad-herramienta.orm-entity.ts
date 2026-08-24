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

  @Column({ name: 'actividadId', type: 'integer' })
  actividadId!: number;

  @Column({ name: 'activoFijoId', type: 'integer' })
  activoFijoId!: number;

  @Column({ name: 'horasEstimadas', type: 'float' })
  horasEstimadas!: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt?: Date;
}
