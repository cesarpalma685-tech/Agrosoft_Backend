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
import { UsuarioOrmEntity } from './usuario.orm-entity';

@Entity('actividades_responsables')
export class ResponsableOrmEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => ActividadOrmEntity)
  @JoinColumn({ name: 'actividadId' })
  actividad!: ActividadOrmEntity;

  @Column({ name: 'actividadId' })
  actividadId!: number;

  @ManyToOne(() => UsuarioOrmEntity)
  @JoinColumn({ name: 'usuarioId' })
  usuario!: UsuarioOrmEntity;

  @Column({ name: 'usuarioId' })
  usuarioId!: number;

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