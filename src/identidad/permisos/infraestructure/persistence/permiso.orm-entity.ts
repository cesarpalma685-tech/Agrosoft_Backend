import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity("permisos")
export class PermisoOrmEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  modulo!: string;

  @Column()
  accion!: string;

  @Column()
  clave!: string;

  @CreateDateColumn()
  created_at!: Date;
}
