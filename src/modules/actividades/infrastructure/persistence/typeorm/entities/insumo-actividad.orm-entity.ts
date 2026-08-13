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

@Entity('actividad_insumos')
export class InsumoActividadOrmEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => ActividadOrmEntity)
  @JoinColumn({ name: 'actividadId' })
  actividad!: ActividadOrmEntity;

  @Column({ name: 'actividadId' })
  actividadId!: number;

  @ManyToOne(() => InsumoOrmEntity)
  @JoinColumn({ name: 'insumoId' })
  insumo!: InsumoOrmEntity;

  @Column({ name: 'insumoId' })
  insumoId!: number;

  @Column('double precision', { name: 'cantidad_usada' })
  cantidadUsada!: number;

  @Column('varchar', { name: 'unidad' })
  unidad!: string;

  @Column('double precision', { name: 'costo_unitario' })
  costoUnitario!: number;

  @Column('double precision', { name: 'costo_total' })
  costoTotal!: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt!: Date;
}