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

@Entity('actividades_servicios')
export class ServicioOrmEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => ActividadOrmEntity)
  @JoinColumn({ name: 'actividadId' })
  actividad!: ActividadOrmEntity;

  @Column({ name: 'actividadId' })
  actividadId!: number;

  @ManyToOne(() => InsumoOrmEntity)
  @JoinColumn({ name: 'maquinariaId' })
  maquinaria!: InsumoOrmEntity;

  @Column({ name: 'maquinariaId' })
  maquinariaId!: number;

  @Column({ name: 'nombreServicio' })
  nombreServicio!: string;

  @Column('double precision')
  horas!: number;

  @Column('double precision', { name: 'precioHora' })
  precioHora!: number;

  @Column('double precision')
  costo!: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt!: Date;
}