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
} from "typeorm";
import { CultivoOrmEntity } from "../../../cultivo/infrastructure/persistence/cultivo.orm-entity";
import { LoteProduccionOrmEntity } from "../../../lote-produccion/infrastructure/persistence/lote-produccion.orm-entity";
import { ActividadResponsableOrmEntity } from "src/actividades_detalles/actividades_responsable/infrastructure/persistence/actividad-responsable.orm-entity";

@Entity("actividades")
export class ActividadOrmEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar" })
  nombre!: string;

  @Column({ type: "varchar" })
  tipo!: string;

  @Column({ type: "varchar", nullable: true })
  subtipo!: string | null;

  @Column({ name: "lote_id", type: "int" })
  loteId!: number;

  @Column({ name: "sub_lote_id", type: "int", nullable: true })
  subLoteId!: number | null;

  @Column({ name: "cultivo_id", type: "int" })
  cultivoId!: number;

  @ManyToOne(() => CultivoOrmEntity)
  @JoinColumn({ name: "cultivo_id" })
  cultivo!: CultivoOrmEntity;

  @Column({ type: "timestamp" })
  fecha!: Date;

  @Column({ name: "horas_actividad", type: "double precision", nullable: true })
  horasActividad!: number | null;

  @Column({
    name: "precio_hora_actividad",
    type: "double precision",
    nullable: true,
  })
  precioHoraActividad!: number | null;

  @Column({ name: "costo_mano_obra", type: "double precision", nullable: true })
  costoManoObra!: number | null;

  @Column({ type: "text", nullable: true })
  descripcion!: string | null;

  @Column({ type: "varchar", default: "pendiente" })
  estado!: string;

  @Column({ name: "creado_por_usuario_id", type: "int", nullable: true })
  creadoPorUsuarioId!: number | null;

  @Column({ name: "cantidad_plantas", type: "int", nullable: true })
  cantidadPlantas!: number | null;

  @Column({ name: "kg_recolectados", type: "double precision", nullable: true })
  kgRecolectados!: number | null;

  @Column({ name: "producto_agro_id", type: "int", nullable: true })
  productoAgroId!: number | null;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt!: Date | null;

  @OneToMany(() => LoteProduccionOrmEntity, (l) => l.actividadCosecha)
  lotesProduccion!: LoteProduccionOrmEntity[];
  @OneToMany(() => ActividadResponsableOrmEntity, (ar) => ar.actividad)
  actividadesResponsables!: ActividadResponsableOrmEntity[];
}
