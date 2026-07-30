import { Entity, PrimaryGeneratedColumn, Column,} from 'typeorm';

@Entity('usuario_permisos')
export class UsuarioPermisoOrmEntity {
@PrimaryGeneratedColumn()
id!: number;

@Column()
usuarioId!: number;

@Column()
permisoId!: number;
}