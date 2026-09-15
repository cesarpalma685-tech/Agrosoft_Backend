import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";

@Entity("tipos_formacion")
export class TipoFormacionOrmEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 50 })
  codigo!: string;

  @Column({ type: "varchar", length: 100 })
  nombre!: string;

  @Column({ type: "text", nullable: true })
  descripcion!: string;

  @Column({ type: "varchar", nullable: true })
  tipoEpaEnum!: string;

  @Column({ type: "boolean", default: true })
  activo!: boolean;

  @Column({ type: "integer", default: 0 })
  orden!: number;

  @CreateDateColumn()
  created_at!: Date;
}
