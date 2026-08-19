import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('clientes')
export class ClienteOrmEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'varchar',
  })
  nombre!: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  identificacion!: string | null;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  telefono!: string | null;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  email!: string | null;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  direccion!: string | null;

  @Column({
    type: 'text',
    nullable: true,
  })
  notas!: string | null;

  @CreateDateColumn()
  created_at!: Date;
}