import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";

@Entity("actividad_insumos")
export class ActividadInsumoOrmEntity {
  @PrimaryGeneratedColumn({ type: "integer" })
  id!: number;

  @Column({ name: "actividadId", type: "integer" })
  actividadId!: number;

  @Column({ name: "insumoId", type: "integer" })
  insumoId!: number;

  @Column({ name: "cantidad_usada", type: "float" })
  cantidadUsada!: number;

  @Column({ type: "varchar" })
  unidad!: string;

  @Column({ name: "costo_unitario", type: "float" })
  costoUnitario!: number;

  @Column({ name: "costo_total", type: "float" })
  costoTotal!: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

  @DeleteDateColumn({ name: "deleted_at", nullable: true })
  deletedAt?: Date;
}
