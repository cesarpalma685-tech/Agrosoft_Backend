import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { ProgramaFormacionNombre } from "../../domain/enums/programa-formacion-nombre.enum";

@Entity("programas_formacion")
export class ProgramaFormacionOrmEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: "varchar",
  })
  numeroFicha!: string;

  @Column({
    type: "enum",
    enum: ProgramaFormacionNombre,
    enumName: "programa_formacion_nombre_enum",
  })
  nombre!: ProgramaFormacionNombre;

  @Column({
    type: "varchar",
    nullable: true,
  })
  tipo!: string | null;

  @Column({
    type: "text",
    nullable: true,
  })
  descripcion!: string | null;

  @Column({
    type: "date",
    nullable: true,
  })
  fechaInicio!: Date | null;

  @Column({
    type: "date",
    nullable: true,
  })
  fechaFin!: Date | null;

  @Column({
    type: "varchar",
    default: "activo",
  })
  estado!: string;

  @Column({
    type: "integer",
    default: 0,
  })
  cantidadAprendices!: number;

  @CreateDateColumn()
  created_at!: Date;
}
