import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { TipoMovimientoInsumoEnum } from "../../domain/enum/tipo-movimiento-insumo.enum";
import { AlmacenOrmEntity } from "src/inventario/almacenes/infrastructure/persistence/almacen.orm-entity";
import { InsumoOrmEntity } from "src/inventario/insumos/infrastructure/persistence/insumo.orm-entity";
import { UsuarioOrmEntity } from "src/identidad/usuarios/infraestructure/persistence/usuario.orm-entity";

@Entity("movimientos_insumos")
export class MovimientoInsumoOrmEntity {
  @PrimaryGeneratedColumn({ type: "integer" })
  id!: number;

  @Column({ name: "insumoId", type: "integer" })
  insumoId!: number;

  @Column({
    type: "enum",
    enum: TipoMovimientoInsumoEnum,
    enumName: "movimientos_insumos_tipo_enum",
  })
  tipo!: TipoMovimientoInsumoEnum;

  @Column({ name: "cantidadPresentacion", type: "double precision" })
  cantidadPresentacion!: number;

  @Column({ name: "cantidadUso", type: "double precision" })
  cantidadUso!: number;

  @Column({
    name: "costoUnitarioPresentacion",
    type: "double precision",
    nullable: true,
  })
  costoUnitarioPresentacion?: number;

  @Column({
    name: "costoUnitarioUso",
    type: "double precision",
    nullable: true,
  })
  costoUnitarioUso?: number;

  @Column({ name: "costoTotal", type: "double precision", nullable: true })
  costoTotal?: number;

  @Column({
    name: "valorInventarioResultante",
    type: "double precision",
    nullable: true,
  })
  valorInventarioResultante?: number;

  @Column({ type: "text", nullable: true })
  descripcion?: string;

  @Column({ name: "actividadId", type: "integer", nullable: true })
  actividadId?: number;

  @Column({ name: "usuarioId", type: "integer", nullable: true })
  usuarioId?: number;

  @Column({ name: "almacenOrigenId", type: "integer", nullable: true })
  almacenOrigenId?: number;

  @Column({ name: "almacenDestinoId", type: "integer", nullable: true })
  almacenDestinoId?: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

  @DeleteDateColumn({ name: "deleted_at", nullable: true })
  deletedAt?: Date;

  @ManyToOne(() => AlmacenOrmEntity)
  @JoinColumn({ name: "almacenOrigenId" })
  almacenOrigen!: AlmacenOrmEntity;

  @ManyToOne(() => AlmacenOrmEntity)
  @JoinColumn({ name: "almacenDestinoId" })
  almacenDestino!: AlmacenOrmEntity;

  @ManyToOne(() => InsumoOrmEntity, { onDelete: "RESTRICT" })
  @JoinColumn({ name: "insumo_id" })
  insumo!: InsumoOrmEntity;

  @ManyToOne(() => UsuarioOrmEntity, (usuario) => usuario.movimientosInsumos, {
    onDelete: "RESTRICT", // o 'NO ACTION' / 'SET NULL' según tu lógica
  })
  @JoinColumn({ name: "usuario_id" })
  usuario!: UsuarioOrmEntity;
}
