import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { ActividadOrmEntity } from './actividad.orm-entity';

@Entity('actividades_evidencias')
export class EvidenciaOrmEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => ActividadOrmEntity)
  @JoinColumn({ name: 'actividadId' })
  actividad!: ActividadOrmEntity;

  @Column({ name: 'actividadId' })
  actividadId!: number;

  @Column('text')
  descripcion!: string;

  @Column('text', {
    transformer: {
      to: (value: string[]): string => JSON.stringify(value ?? []),
      from: (value: string): string[] =>
        value ? (JSON.parse(value) as string[]) : [],
    },
  })
  imagenes!: string[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt!: Date;
}