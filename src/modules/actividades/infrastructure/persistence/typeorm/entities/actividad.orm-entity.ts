import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('actividades')
export class ActividadOrmEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  nombre!: string;
}