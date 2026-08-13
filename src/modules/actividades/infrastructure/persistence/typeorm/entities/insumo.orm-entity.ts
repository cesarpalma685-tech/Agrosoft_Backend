import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('insumos')
export class InsumoOrmEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  nombre!: string;
}