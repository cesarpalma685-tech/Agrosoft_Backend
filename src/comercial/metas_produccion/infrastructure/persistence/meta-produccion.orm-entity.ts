import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { UnidadProductivaOrmEntity } from "src/territorio/unidades_productivas/infrastructure/persistence/unidad-productiva.orm-entity";

// Una meta por unidad productiva y año
@Entity("metas_produccion")
@Index(["unidadProductivaId", "anio"], { unique: true })
export class MetaProduccionOrmEntity {
  @PrimaryGeneratedColumn({ type: "integer" })
  id!: number;

  @Column({ name: "unidad_productiva_id", type: "integer" })
  unidadProductivaId!: number;

  @ManyToOne(() => UnidadProductivaOrmEntity, { onDelete: "CASCADE" })
  @JoinColumn({ name: "unidad_productiva_id" })
  unidadProductiva!: UnidadProductivaOrmEntity;

  @Column({ type: "integer" })
  anio!: number;

  @Column({ name: "valor_meta", type: "double precision" })
  valorMeta!: number;

  @Column({ name: "definida_por_usuario_id", type: "integer", nullable: true })
  definidaPorUsuarioId!: number | null;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;
}
