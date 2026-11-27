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
import { EpaOrmEntity } from "../../../epa/infrastructure/persistence/epa.orm-entity";
import { CultivoOrmEntity } from "../../../cultivo/infrastructure/persistence/cultivo.orm-entity";
import { LoteOrmEntity } from "../../../../territorio/lotes/infrastructure/persistence/lote.orm-entity";
import { SubloteOrmEntity } from "../../../../territorio/sublotes/infrastructure/persistence/sublote.orm-entity";
import { UsuarioOrmEntity } from "../../../../identidad/usuarios/infraestructure/persistence/usuario.orm-entity";

// Hecho imprevisto (plaga, enfermedad, clima…) que afecta un cultivo (RF14.1)
@Entity("contingencias")
export class ContingenciaOrmEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar" })
  nombre!: string;

  // Plaga | Enfermedad | Clima | Nutricional | Infraestructura | Otro
  @Column({ type: "varchar" })
  tipo!: string;

  @Column({ name: "epa_id", type: "int", nullable: true })
  epaId!: number | null;

  @ManyToOne(() => EpaOrmEntity, { nullable: true })
  @JoinColumn({ name: "epa_id" })
  epa!: EpaOrmEntity | null;

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

  @Column({ type: "varchar", nullable: true })
  zona!: string | null;

  @Column({ type: "date" })
  fecha!: string;

  // baja | media | alta | critica
  @Column({ type: "varchar" })
  gravedad!: string;

  // activa | en_seguimiento | resuelta | cerrada
  @Column({ type: "varchar", default: "activa" })
  estado!: string;

  @Column({ type: "text" })
  descripcion!: string;

  // Fotografías en base64
  @Column({ type: "text", array: true, default: () => "ARRAY[]::text[]" })
  evidencias!: string[];

  @Column({ name: "registrado_por_usuario_id", type: "int", nullable: true })
  registradoPorUsuarioId!: number | null;

  @ManyToOne(() => UsuarioOrmEntity, { nullable: true })
  @JoinColumn({ name: "registrado_por_usuario_id" })
  registradoPor!: UsuarioOrmEntity | null;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt!: Date | null;
}
