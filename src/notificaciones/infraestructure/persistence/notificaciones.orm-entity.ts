import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn,} from 'typeorm';

@Entity('notificaciones')
export class NotificacionOrmEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  usuarioId!: number;

  @Column()
  titulo!: string;

  @Column('text')
  mensaje!: string;

  @Column({ default: false })
  leida!: boolean;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  tipo!: string | null;

  @Column({
    type: 'json',
    nullable: true,
  })
  metadata!: Record<string, any> | null;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;
}