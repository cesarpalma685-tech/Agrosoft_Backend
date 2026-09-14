import { ActividadOrmEntity } from "src/produccion/actividad/infrastructure/persistence/actividad.orm-entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm";

@Entity("usos_herramientas")
export class UsoHerramientaOrmEntity {
  @PrimaryGeneratedColumn({ type: "integer" })
  id!: number;

  @Column({ name: "actividadId", type: "integer" })
  actividadId!: number;

  @Column({ name: "insumoId", type: "integer" })
  insumoId!: number;

  @Column({ name: "horasUsadas", type: "float" })
  horasUsadas!: number;

  @Column({ name: "depreciacionGenerada", type: "float" })
  depreciacionGenerada!: number;

  @Column({ name: "valorEnLibrosAntes", type: "float" })
  valorEnLibrosAntes!: number;

  @Column({ name: "valorEnLibrosDespues", type: "float" })
  valorEnLibrosDespues!: number;

  @Column({ name: "fechaUso", type: "timestamp" })
  fechaUso!: Date;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

  @DeleteDateColumn({ name: "deleted_at", nullable: true })
  deletedAt?: Date;

  @ManyToOne(() => ActividadOrmEntity,(actividad) => actividad.usosHerramientas,
    { onDelete: "CASCADE" },
  )
  @JoinColumn({ name: "actividadId" })
  actividad!: ActividadOrmEntity;
}
