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
import { CultivoOrmEntity } from "../../../cultivo/infrastructure/persistence/cultivo.orm-entity";

@Entity("cultivo_historial")
export class CultivoHistorialOrmEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "cultivo_id", type: "int" })
  cultivoId!: number;

  @ManyToOne(() => CultivoOrmEntity)
  @JoinColumn({ name: "cultivo_id" })
  cultivo!: CultivoOrmEntity;

  @Column({ name: "usuario_id", type: "int", nullable: true })
  usuarioId!: number | null;

  @Column({ type: "text", nullable: true })
  motivo!: string | null;

  @Column({ type: "jsonb", nullable: true })
  cambios!: Record<string, unknown> | null;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt!: Date | null;
}
