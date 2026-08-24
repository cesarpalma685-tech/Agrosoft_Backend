import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { TipoCultivoWikiOrmEntity } from '../../../../wiki_agronomia/tipo-cultivo-wiki/infrastructure/persistence/tipo-cultivo-wiki.orm-entity';

@Entity('epas')
export class EpaOrmEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar' })
  nombre!: string;

  @Column({ name: 'tipo_epa', type: 'varchar' })
  tipoEpa!: string;

  @Column({ type: 'text', nullable: true })
  descripcion!: string | null;

  @Column({ type: 'text', nullable: true })
  sintomas!: string | null;

  @Column({ name: 'manejo_y_control', type: 'text', nullable: true })
  manejoYControl!: string | null;

  @Column({ name: 'meses_probables', type: 'int', array: true, default: () => 'ARRAY[]::integer[]' })
  mesesProbables!: number[];

  @Column({ type: 'text', array: true, default: () => 'ARRAY[]::text[]' })
  temporadas!: string[];

  @Column({ name: 'notas_estacionalidad', type: 'text', nullable: true })
  notasEstacionalidad!: string | null;

  @Column({ name: 'fotos_sintomas', type: 'text', array: true, default: () => 'ARRAY[]::text[]' })
  fotosSintomas!: string[];

  @Column({ name: 'fotos_generales', type: 'text', array: true, default: () => 'ARRAY[]::text[]' })
  fotosGenerales!: string[];

  @Column({ type: 'text', array: true, default: () => 'ARRAY[]::text[]' })
  tags!: string[];

  @Column({ name: 'creado_por_usuario_id', type: 'int', nullable: true })
  creadoPorUsuarioId!: number | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt!: Date | null;

  @ManyToMany(() => TipoCultivoWikiOrmEntity, (tipo) => tipo.epas)
  @JoinTable({
    name: 'epa_tipos_cultivos_wiki',
    joinColumn: { name: 'epa_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tipo_cultivo_wiki_id', referencedColumnName: 'id' },
  })
  tiposCultivosWiki!: TipoCultivoWikiOrmEntity[];
}