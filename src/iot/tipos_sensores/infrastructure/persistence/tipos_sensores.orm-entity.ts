import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("tipos_sensores")
export class TiposSensoresOrmEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar" })
  nombre!: string;

  @Column({ type: "varchar" })
  unidad!: string;

  @Column({ type: "integer" })
  decimales!: number;

  @Column({ type: "text", nullable: true })
  descripcion!: string | null;

  @Column({ type: "varchar", nullable: true })
  imagen!: string | null;

  @Column({ type: "integer" })
  ttl_minutos!: number;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at!: Date | null;
}
