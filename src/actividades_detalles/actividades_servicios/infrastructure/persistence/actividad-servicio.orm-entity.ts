import { ActividadOrmEntity } from "src/produccion/actividad/infrastructure/persistence/actividad.orm-entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

@Entity("actividades_servicios")
export class ActividadServicioOrmEntity {
  @PrimaryGeneratedColumn({ type: "integer" })
  id!: number;

  @Column({ name: "actividadId", type: "integer" })
  actividadId!: number;

  @Column({ name: "maquinariaId", type: "integer" })
  maquinariaId!: number;

  @Column({ name: "nombreServicio", type: "varchar" })
  nombreServicio!: string;

  @Column({ type: "float" })
  horas!: number;

  @Column({ name: "precioHora", type: "float" })
  precioHora!: number;

  @Column({ type: "float" })
  costo!: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

  @DeleteDateColumn({ name: "deleted_at", nullable: true })
  deletedAt?: Date;

  @ManyToOne(
    () => ActividadOrmEntity,
    (actividad) => actividad.actividadesServicios,
    { onDelete: "CASCADE" },
  )
  @JoinColumn({ name: "actividadId" })
  actividad!: ActividadOrmEntity;
}