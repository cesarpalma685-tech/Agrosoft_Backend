import { LoteOrmEntity } from "src/territorio/lotes/infrastructure/persistence/lote.orm-entity";
import { UsuarioOrmEntity } from "src/identidad/usuarios/infraestructure/persistence/usuario.orm-entity";

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("unidades_productivas")
export class UnidadProductivaOrmEntity {
  @PrimaryGeneratedColumn({ type: "integer" })
  id!: number;

  @Column({ type: "varchar" })
  nombre!: string;

  @Column({ type: "varchar", nullable: true })
  descripcion!: string | null;

  @Column({ type: "integer", nullable: true })
  responsable_id!: number | null;

  @ManyToOne(() => UsuarioOrmEntity, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "responsable_id" })
  responsable!: UsuarioOrmEntity | null;

  // activa | inactiva | en_seguimiento | en_riesgo
  @Column({ type: "varchar", default: "activa" })
  estado!: string;

  @CreateDateColumn({ type: "timestamp" })
  created_at!: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updated_at!: Date;

  @DeleteDateColumn({ type: "timestamp", nullable: true })
  deleted_at!: Date | null;

  @OneToMany(() => LoteOrmEntity, (lote: LoteOrmEntity) => lote.unidadProductiva)
  lotes!: LoteOrmEntity[];
}
