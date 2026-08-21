import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn,} from 'typeorm';
import { PermisoOrmEntity } from '../../../permisos/infraestructure/persistence/permiso.orm-entity';
import { UsuarioOrmEntity } from '../../../usuarios/infraestructure/persistence/usuario.orm-entity';

@Entity('usuario_permisos')
export class UsuarioPermisoOrmEntity {
@PrimaryGeneratedColumn()
id!: number;

@Column()
usuarioId!: number;

@Column()
permisoId!: number;

@ManyToOne(() => UsuarioOrmEntity, { onDelete: 'CASCADE' })
@JoinColumn({ name: 'usuarioId' })
usuario!: UsuarioOrmEntity;

@ManyToOne(() => PermisoOrmEntity, { onDelete: 'CASCADE' })
@JoinColumn({ name: 'permisoId' })
permiso!: PermisoOrmEntity;
}