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

@Entity('actividades_insumos_uso')
export class UsoInsumoOrmEntity {
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

  @Column('double precision', { name: 'cantidadUso' })
  cantidadUso!: number;

  @Column('double precision', { name: 'costoUnitarioUso' })
  costoUnitarioUso!: number;

  @Column('double precision', { name: 'costoTotal' })
  costoTotal!: number;

  @Column({ name: 'movimientoInsumoId' })
  movimientoInsumoId!: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt!: Date;
}