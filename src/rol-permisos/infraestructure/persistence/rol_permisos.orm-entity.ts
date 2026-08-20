import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    JoinColumn,
    ManyToOne,
} from 'typeorm';
import { PermisoOrmEntity } from '../../../permisos/infraestructure/persistence/permiso.orm-entity';
import { RolOrmEntity } from '../../../roles/infraestructure/persistence/rol.orm-entity';

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

  @ManyToOne(() => RolOrmEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'rolId' })
  rol!: RolOrmEntity;

  @ManyToOne(() => PermisoOrmEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'permisoId' })
  permiso!: PermisoOrmEntity;

}