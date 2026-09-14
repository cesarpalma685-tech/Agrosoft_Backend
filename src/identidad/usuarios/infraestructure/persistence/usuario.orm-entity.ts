import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { RolOrmEntity } from '../../../roles/infraestructure/persistence/rol.orm-entity';
import { ProgramaFormacionOrmEntity } from '../../../../formacion/programas-formacion/infraestructure/persistence/programa-formacion.orm-entity';
import { NotificacionOrmEntity } from 'src/identidad/notificaciones/infraestructure/persistence/notificaciones.orm-entity';
import { ActividadHistorialOrmEntity } from 'src/actividades_detalles/actividades_historial/infrastructure/persistence/actividad-historial.orm-entity';
import { ActividadResponsableOrmEntity } from 'src/actividades_detalles/actividades_responsable/infrastructure/persistence/actividad-responsable.orm-entity';
import { MovimientoProduccionOrmEntity } from 'src/produccion/movimiento-produccion/infrastructure/persistence/movimiento-produccion.orm-entity';

@Entity("usuarios")
export class UsuarioOrmEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar" })
  nombre!: string;

  @Column({ type: "varchar" })
  apellido!: string;

  @Column({ type: "varchar", unique: true, nullable: true })
  identificacion!: string;

  @Column({ type: "int", nullable: true })
  idFicha!: number;

  @Column({ type: "varchar", nullable: true })
  programaFormacionId!: string | null;

  @Column({ type: "varchar", nullable: true })
  telefono!: string | null;

  @Column({ type: "varchar", unique: true })
  correo!: string;

  @Column({ type: "varchar" })
  passwordHash!: string;

  @Column({ type: "timestamp", nullable: true })
  lastLoginAt!: Date | null;

  @Column({ type: "timestamp", nullable: true })
  emailVerifiedAt!: Date | null;

  @Column({ type: "varchar", default: "activo" })
  estado!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;

  @ManyToOne(() => RolOrmEntity)
  @JoinColumn({ name: "rolId" })
  rol!: RolOrmEntity;

  @ManyToOne(() => ProgramaFormacionOrmEntity)
  @JoinColumn({ name: 'programaFormacionId' })
  programaFormacion!: ProgramaFormacionOrmEntity;
  movimientosInsumos: any;

  @OneToMany( () => NotificacionOrmEntity,
  (notificacion)=>notificacion.usuario)
  notificaciones!: NotificacionOrmEntity[];

  @OneToMany(() => ActividadHistorialOrmEntity,
  (actividadHistorial) => actividadHistorial.usuario)
  actividadesHistorial!: ActividadHistorialOrmEntity[];

  @OneToMany(() => ActividadResponsableOrmEntity,
  (actividadResponsable) => actividadResponsable.usuario)
  actividadesResponsables!: ActividadResponsableOrmEntity[];

  @OneToMany(() => MovimientoProduccionOrmEntity,
  (movimientoProduccion) => movimientoProduccion.usuario)
  movimientosProduccion!: MovimientoProduccionOrmEntity[];
}
