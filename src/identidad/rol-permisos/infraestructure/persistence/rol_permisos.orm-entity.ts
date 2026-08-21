import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
} from 'typeorm';

@Entity('rol_permisos')
export class RolPermisoOrmEntity {

@PrimaryGeneratedColumn()
id!: number;

@Column()
rolId!: number;

@Column()
permisoId!: number;

@CreateDateColumn()
created_at!: Date;
}