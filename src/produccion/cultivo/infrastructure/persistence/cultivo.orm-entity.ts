import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from "typeorm";
import { CultivoHistorialOrmEntity } from "../../../cultivo-historial/infrastructure/persistence/cultivo-historial.orm-entity";
import { ActividadOrmEntity } from "../../../actividad/infrastructure/persistence/actividad.orm-entity";
import { LoteProduccionOrmEntity } from "../../../lote-produccion/infrastructure/persistence/lote-produccion.orm-entity";

@Entity("cultivos")
export class CultivoOrmEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "nombre_cultivo", type: "varchar" })
  nombreCultivo!: string;

  @Column({ name: "tipo_cultivo", type: "varchar" })
  tipoCultivo!: string;

  @Column({ type: "text", nullable: true })
  descripcion!: string | null;

  @Column({ name: "lote_id", type: "int" })
  loteId!: number;

  @Column({ name: "sublote_id", type: "int", nullable: true })
  subloteId!: number | null;

  @Column({ name: "img_cultivo", type: "varchar", nullable: true })
  imgCultivo!: string | null;

  @Column({ name: "fecha_siembra", type: "date" })
  fechaSiembra!: Date;

  @Column({ name: "fecha_finalizacion", type: "date", nullable: true })
  fechaFinalizacion!: Date | null;

  @Column({
    name: "costo_total",
    type: "decimal",
    precision: 12,
    scale: 2,
    default: 0,
  })
  costoTotal!: string;

  @Column({ type: "varchar", default: "activo" })
  estado!: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt!: Date | null;

  @OneToMany(() => CultivoHistorialOrmEntity, (h) => h.cultivo)
  historial!: CultivoHistorialOrmEntity[];

  @OneToMany(() => ActividadOrmEntity, (a) => a.cultivo)
  actividades!: ActividadOrmEntity[];

  @OneToMany(() => LoteProduccionOrmEntity, (l) => l.cultivo)
  lotesProduccion!: LoteProduccionOrmEntity[];
}
