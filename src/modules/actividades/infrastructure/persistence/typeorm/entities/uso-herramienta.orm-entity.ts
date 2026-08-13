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

@Entity('usos_herramientas')
export class UsoHerramientaOrmEntity {
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

  @Column('double precision', { name: 'horasUsadas' })
  horasUsadas!: number;

  @Column('double precision', { name: 'depreciacionGenerada' })
  depreciacionGenerada!: number;

  @Column('double precision', { name: 'valorEnLibrosAntes' })
  valorEnLibrosAntes!: number;

  @Column('double precision', { name: 'valorEnLibrosDespues' })
  valorEnLibrosDespues!: number;

  @Column({ name: 'fechaUso' })
  fechaUso!: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt!: Date;
}