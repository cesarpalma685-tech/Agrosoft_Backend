import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('actividades_evidencias')
export class ActividadEvidenciaOrmEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id!: number;

  @Column({ name: 'actividad_id', type: 'integer' })
  actividadId!: number;

  @Column({ name: 'archivo_url', type: 'varchar', length: 255 })
  archivoUrl!: string;

  @Column({ name: 'tipo_archivo', type: 'varchar', length: 100, nullable: true })
  tipoArchivo?: string;

  @Column({ type: 'text', nullable: true })
  descripcion?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt?: Date;
}
