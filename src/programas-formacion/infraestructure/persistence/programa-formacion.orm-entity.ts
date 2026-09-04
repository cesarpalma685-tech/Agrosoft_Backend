import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';


@Entity('programas_formacion')
export class ProgramaFormacionOrmEntity {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'varchar',
  })
  numeroFicha!: string;

  @Column({
    type: 'varchar',
  })
  nombre!: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  tipo!: string | null;

  @Column({
    type: 'text',
    nullable: true,
  })
  descripcion!: string | null;

  @Column({
    type: 'date',
    nullable: true,
  })
  fechaInicio!: Date | null;

  @Column({
    type: 'date',
    nullable: true,
  })
  fechaFin!: Date | null;

  @Column({
    type: 'varchar',
    default: 'activo',
  })
  estado!: string;

  @Column({
    type: 'integer',
    default: 0,
  })
  cantidadAprendices!: number;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;
}