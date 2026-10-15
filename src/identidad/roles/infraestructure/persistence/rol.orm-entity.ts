import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from "typeorm";
import { RolPermisoOrmEntity } from "../../../rol-permisos/infraestructure/persistence/rol_permisos.orm-entity";
import { UsuarioOrmEntity } from "../../../usuarios/infraestructure/persistence/usuario.orm-entity";
import { RolNombre } from "../../domain/enums/rol-nombre.enum";

@Entity("roles")
export class RolOrmEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: "enum",
    enum: RolNombre,
    enumName: "rol_nombre_enum",
    unique: true,
  })
  nombre!: RolNombre;

  @Column({
    type: "varchar",
  })
  descripcion!: string;

  @Column({
    type: "boolean",
    default: false,
  })
  es_sistema!: boolean;

  @Column({
    type: "varchar",
    default: "activo",
  })
  estado!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date | null;

  @OneToMany(() => UsuarioOrmEntity, (usuario) => usuario.rol)
  usuarios!: UsuarioOrmEntity[];

  @OneToMany(() => RolPermisoOrmEntity, (rp) => rp.rol)
  rolPermisos!: RolPermisoOrmEntity[];
}
