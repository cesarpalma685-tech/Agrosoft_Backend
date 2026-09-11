import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";

@Entity("actividades_insumos_uso")
export class ActividadInsumoUsoOrmEntity {
  @PrimaryGeneratedColumn({ type: "integer" })
  id!: number;

  @Column({ name: "actividadId", type: "integer" })
  actividadId!: number;

  @Column({ name: "insumoId", type: "integer" })
  insumoId!: number;

  @Column({ name: "cantidadUso", type: "float" })
  cantidadUso!: number;

  @Column({ name: "costoUnitarioUso", type: "float" })
  costoUnitarioUso!: number;

  @Column({ name: "costoTotal", type: "float" })
  costoTotal!: number;

  @Column({ name: "movimientoInsumoId", type: "integer" })
  movimientoInsumoId!: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

  @DeleteDateColumn({ name: "deleted_at", nullable: true })
  deletedAt?: Date;
}
