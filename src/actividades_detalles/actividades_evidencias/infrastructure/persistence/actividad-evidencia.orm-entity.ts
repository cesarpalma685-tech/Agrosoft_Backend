import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('actividades_evidencias')
export class ActividadEvidenciaOrmEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id!: number;

  @Column({ name: 'actividadId', type: 'integer' })
  actividadId!: number;

  @Column({ type: 'text' })
  descripcion!: string;

  @Column({
    type: 'text',
    nullable: true,
    transformer: {
      to: (value?: string[]): string => JSON.stringify(value ?? []),
      from: (value: string): string[] =>
        value ? (JSON.parse(value) as string[]) : [],
    },
  })
  imagenes?: string[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt?: Date;
}
