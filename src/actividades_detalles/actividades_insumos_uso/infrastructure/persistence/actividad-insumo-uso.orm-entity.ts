import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('actividades_insumos_uso')
export class ActividadInsumoUsoOrmEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id!: number;

  @Column({ name: 'actividad_id', type: 'integer' })
  actividadId!: number;

  @Column({ name: 'insumo_id', type: 'integer' })
  insumoId!: number;

  @Column({ name: 'cantidad_usada', type: 'numeric', precision: 10, scale: 2 })
  cantidadUsada!: number;

  @Column({ type: 'text', nullable: true })
  observaciones?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt?: Date;
}
