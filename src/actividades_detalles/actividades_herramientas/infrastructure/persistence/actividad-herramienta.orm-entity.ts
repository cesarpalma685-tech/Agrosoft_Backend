import { ActividadOrmEntity } from "src/produccion/actividad/infrastructure/persistence/actividad.orm-entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";
import { ManyToOne } from "typeorm/browser";
import { JoinColumn } from "typeorm/browser";

@Entity("actividades_herramientas")
export class ActividadHerramientaOrmEntity {
  @PrimaryGeneratedColumn({ type: "integer" })
  id!: number;

  @Column({ name: "actividadId", type: "integer" })
  actividadId!: number;

  @Column({ name: "activoFijoId", type: "integer" })
  activoFijoId!: number;

  @Column({ name: "horasEstimadas", type: "float" })
  horasEstimadas!: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

  @DeleteDateColumn({ name: "deleted_at", nullable: true })
  deletedAt?: Date;

  @ManyToOne(() => ActividadOrmEntity, (actividad) => actividad.actividadesHerramientas, 
  { onDelete: "CASCADE" },
  )
  @JoinColumn({ name: "actividadId" })
  actividad!: ActividadOrmEntity;
}
