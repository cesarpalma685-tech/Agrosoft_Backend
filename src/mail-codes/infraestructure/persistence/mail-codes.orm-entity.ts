import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,} from 'typeorm';

@Entity('email_codes')
export class EmailCodeOrmEntity {
@PrimaryGeneratedColumn()
id!: number;

@Column()
usuarioId!: number;

@Column()
tipo!: string;

@Column()
code!: string;

@Column({ type: 'timestamp' })
expiresAt!: Date;

@Column({ type: 'timestamp', nullable: true })
usedAt!: Date | null;

@CreateDateColumn()
created_at!: Date;
}