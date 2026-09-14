import { UsuarioOrmEntity } from "src/identidad/usuarios/infraestructure/persistence/usuario.orm-entity";
import { ActividadOrmEntity } from "src/produccion/actividad/infrastructure/persistence/actividad.orm-entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";
import { JoinColumn } from "typeorm/browser";
import { ManyToOne } from "typeorm/browser";

@Entity("actividad_historial")
export class ActividadHistorialOrmEntity {
  @PrimaryGeneratedColumn({ type: "integer" })
  id!: number;

  @Column({ name: "actividad_id", type: "integer" })
  actividadId!: number;

  @Column({ name: "usuario_id", type: "integer" })
  usuarioId!: number;

  @Column({ type: "text", nullable: true })
  motivo?: string;

  @Column({ type: "jsonb", nullable: true })
  cambios?: Record<string, any>;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

  @DeleteDateColumn({ name: "deleted_at", nullable: true })
  deletedAt?: Date;

  @ManyToOne(() => ActividadOrmEntity,(actividad) => actividad.actividadesHistorial,
    { onDelete: "CASCADE" },
  )
  @JoinColumn({ name: "actividad_id" })
  actividad!: ActividadOrmEntity;

  @ManyToOne(() => UsuarioOrmEntity)
  @JoinColumn({ name: 'usuarioId' })
  usuario!: UsuarioOrmEntity;
}
