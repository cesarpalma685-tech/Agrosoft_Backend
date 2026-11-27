import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { CultivoOrmEntity } from "../../../cultivo/infrastructure/persistence/cultivo.orm-entity";
import { LoteOrmEntity } from "../../../../territorio/lotes/infrastructure/persistence/lote.orm-entity";
import { SubloteOrmEntity } from "../../../../territorio/sublotes/infrastructure/persistence/sublote.orm-entity";
import { UsuarioOrmEntity } from "../../../../identidad/usuarios/infraestructure/persistence/usuario.orm-entity";
import { ContingenciaOrmEntity } from "./contingencia.orm-entity";

// Aplicación de un producto para atender (o prevenir) una contingencia. Debe aprobarla el administrador (RF14.3, RF14.5).
@Entity("tratamientos_fitosanitarios")
export class TratamientoOrmEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar" })
  nombre!: string;

  // Fungicida | Insecticida | Herbicida | Preventivo | Otro
  @Column({ type: "varchar" })
  tipo!: string;

  @Column({ name: "cultivo_id", type: "int", nullable: true })
  cultivoId!: number | null;

  @ManyToOne(() => CultivoOrmEntity, { nullable: true })
  @JoinColumn({ name: "cultivo_id" })
  cultivo!: CultivoOrmEntity | null;

  @Column({ name: "lote_id", type: "int", nullable: true })
  loteId!: number | null;

  @ManyToOne(() => LoteOrmEntity, { nullable: true })
  @JoinColumn({ name: "lote_id" })
  lote!: LoteOrmEntity | null;

  @Column({ name: "sub_lote_id", type: "int", nullable: true })
  subLoteId!: number | null;

  @ManyToOne(() => SubloteOrmEntity, { nullable: true })
  @JoinColumn({ name: "sub_lote_id" })
  sublote!: SubloteOrmEntity | null;

  @Column({ name: "fecha_aplicacion", type: "date" })
  fechaAplicacion!: string;

  @Column({ type: "varchar" })
  responsable!: string;

  @Column({ type: "varchar" })
  producto!: string;

  @Column({ type: "varchar" })
  dosis!: string;

  @Column({ name: "metodo_aplicacion", type: "varchar" })
  metodoAplicacion!: string;

  @Column({ name: "contingencia_id", type: "int", nullable: true })
  contingenciaId!: number | null;

  @ManyToOne(() => ContingenciaOrmEntity, { nullable: true })
  @JoinColumn({ name: "contingencia_id" })
  contingencia!: ContingenciaOrmEntity | null;

  // programado | en_ejecucion | seguimiento | finalizado
  @Column({ type: "varchar", default: "programado" })
  estado!: string;

  // pendiente | aprobado | rechazado
  @Column({ type: "varchar", default: "pendiente" })
  aprobacion!: string;

  @Column({ name: "aprobado_por_usuario_id", type: "int", nullable: true })
  aprobadoPorUsuarioId!: number | null;

  @ManyToOne(() => UsuarioOrmEntity, { nullable: true })
  @JoinColumn({ name: "aprobado_por_usuario_id" })
  aprobadoPor!: UsuarioOrmEntity | null;

  @Column({ name: "fecha_aprobacion", type: "timestamp", nullable: true })
  fechaAprobacion!: Date | null;

  @Column({ type: "text", nullable: true })
  observaciones!: string | null;

  @Column({ type: "double precision", default: 0 })
  costo!: number;

  @Column({ name: "registrado_por_usuario_id", type: "int", nullable: true })
  registradoPorUsuarioId!: number | null;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt!: Date | null;
}
