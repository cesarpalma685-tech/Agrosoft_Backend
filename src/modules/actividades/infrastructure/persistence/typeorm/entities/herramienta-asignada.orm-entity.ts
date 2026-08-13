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
import { InsumoOrmEntity } from './insumo.orm-entity';

@Entity('actividades_herramientas')
export class HerramientaAsignadaOrmEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => ActividadOrmEntity)
  @JoinColumn({ name: 'actividadId' })
  actividad!: ActividadOrmEntity;

  @Column({ name: 'actividadId' })
  actividadId!: number;

  @ManyToOne(() => InsumoOrmEntity)
  @JoinColumn({ name: 'activoFijoId' })
  activoFijo!: InsumoOrmEntity;

  @Column({ name: 'activoFijoId' })
  activoFijoId!: number;

  @Column('double precision', { name: 'horasEstimadas' })
  horasEstimadas!: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt!: Date;
}