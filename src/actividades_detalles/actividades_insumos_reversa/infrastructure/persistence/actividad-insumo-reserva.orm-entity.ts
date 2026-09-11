import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";

@Entity("actividades_insumos_reserva")
export class ActividadInsumoReservaOrmEntity {
  @PrimaryGeneratedColumn({ type: "integer" })
  id!: number;

  @Column({ name: "actividadId", type: "integer" })
  actividadId!: number;

  @Column({ name: "insumoId", type: "integer" })
  insumoId!: number;

  @Column({ name: "cantidadReservada", type: "float" })
  cantidadReservada!: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

  @DeleteDateColumn({ name: "deleted_at", nullable: true })
  deletedAt?: Date;
}
