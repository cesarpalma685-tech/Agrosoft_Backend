import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
} from "typeorm";
import { EpaOrmEntity } from "../../../../produccion/epa/infrastructure/persistence/epa.orm-entity";

@Entity("tipos_cultivos_wiki")
export class TipoCultivoWikiOrmEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar" })
  nombre!: string;

  @Column({ type: "text", nullable: true })
  descripcion!: string | null;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt!: Date | null;

  @ManyToMany(() => EpaOrmEntity, (epa) => epa.tiposCultivosWiki)
  epas!: EpaOrmEntity[];
}
