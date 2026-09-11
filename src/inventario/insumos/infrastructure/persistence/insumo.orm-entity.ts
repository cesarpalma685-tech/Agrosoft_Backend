import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { TipoInsumoEnum } from "../../domain/enums/tipo-insumo.enum";
import { EstadoInsumoEnum } from "../../domain/enums/estado-insumo.enum";
import { AlmacenOrmEntity } from "src/inventario/almacenes/infrastructure/persistence/almacen.orm-entity";
import { MovimientoInsumoOrmEntity } from "src/inventario/movimientos_isumos/infrastructure/persistence/movimiento-insumo.orm-entity";
import { ReservaOrmEntity } from "src/inventario/reservas/infrastructure/persistence/reserva.orm-entity";

@Entity("insumos")
export class InsumoOrmEntity {
  @PrimaryGeneratedColumn({ type: "integer" })
  id!: number;

  @Column({ type: "varchar", length: 255 })
  nombre!: string;

  @Column({ type: "text" })
  descripcion!: string;

  @Column({ type: "text", nullable: true, name: "foto_url" })
  fotoUrl?: string;

  @Column({ type: "varchar", length: 100, name: "presentacion_tipo" })
  presentacionTipo!: string;

  @Column({
    type: "numeric",
    precision: 12,
    scale: 2,
    name: "presentacion_cantidad",
  })
  presentacionCantidad!: number;

  @Column({ type: "varchar", length: 50, name: "presentacion_unidad" })
  presentacionUnidad!: string;

  @Column({ type: "varchar", length: 50, name: "unidad_uso" })
  unidadUso!: string;

  @Column({ type: "varchar", length: 100, name: "tipo_materia" })
  tipoMateria!: string;

  @Column({
    type: "numeric",
    precision: 12,
    scale: 4,
    name: "factor_conversion_uso",
  })
  factorConversionUso!: number;

  @Column({
    type: "numeric",
    precision: 12,
    scale: 2,
    name: "stock_presentacion",
    default: 0,
  })
  stockPresentacion!: number;

  @Column({
    type: "numeric",
    precision: 12,
    scale: 2,
    name: "stock_uso",
    default: 0,
  })
  stockUso!: number;

  @Column({
    type: "numeric",
    precision: 12,
    scale: 2,
    name: "stock_reservado",
    default: 0,
  })
  stockReservado!: number;

  @Column({
    type: "numeric",
    precision: 12,
    scale: 2,
    name: "stock_minimo",
    default: 0,
  })
  stockMinimo!: number;

  @Column({
    type: "numeric",
    precision: 12,
    scale: 2,
    name: "precio_unitario_presentacion",
  })
  precioUnitarioPresentacion!: number;

  @Column({
    type: "numeric",
    precision: 12,
    scale: 2,
    name: "precio_unitario_uso",
  })
  precioUnitarioUso!: number;

  @Column({ type: "numeric", precision: 12, scale: 2, name: "costo_unitario" })
  costoUnitario!: number;

  @Column({
    type: "numeric",
    precision: 12,
    scale: 2,
    name: "costo_adquisicion",
  })
  costoAdquisicion!: number;

  @Column({
    type: "numeric",
    precision: 12,
    scale: 2,
    name: "valor_inventario",
    default: 0,
  })
  valorInventario!: number;

  @Column({
    type: "numeric",
    precision: 12,
    scale: 2,
    name: "valor_residual",
    default: 0,
  })
  valorResidual!: number;

  @Column({ type: "integer", name: "vida_util_horas", default: 0 })
  vidaUtilHoras!: number;

  @Column({ type: "integer", name: "horas_usadas", default: 0 })
  horasUsadas!: number;

  @Column({
    type: "numeric",
    precision: 12,
    scale: 2,
    name: "depreciacion_acumulada",
    default: 0,
  })
  depreciacionAcumulada!: number;

  @Column({ type: "integer", name: "almacen_id" })
  almacenId!: number;

  @Column({ type: "integer", name: "proveedor_id" })
  proveedorId!: number;

  @Column({ type: "integer", name: "categoria_id" })
  categoriaId!: number;

  @Column({ type: "integer", name: "creado_por_usuario_id" })
  creadoPorUsuarioId!: number;

  @Column({
    type: "enum",
    enum: TipoInsumoEnum,
    name: "tipo_insumo",
  })
  tipoInsumo!: TipoInsumoEnum;

  @Column({
    type: "enum",
    enum: EstadoInsumoEnum,
    name: "estado",
    default: EstadoInsumoEnum.ACTIVO,
  })
  estado!: EstadoInsumoEnum;

  @Column({ type: "timestamp", name: "fecha_registro" })
  fechaRegistro!: Date;

  @Column({ type: "timestamp", nullable: true, name: "fecha_adquisicion" })
  fechaAdquisicion?: Date;

  @Column({
    type: "timestamp",
    nullable: true,
    name: "fecha_ultimo_mantenimiento",
  })
  fechaUltimoMantenimiento?: Date;

  @Column({ type: "timestamp", nullable: true, name: "fecha_baja" })
  fechaBaja?: Date;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

  @DeleteDateColumn({ name: "deleted_at", nullable: true })
  deletedAt?: Date;

  @ManyToOne(() => AlmacenOrmEntity)
  @JoinColumn({ name: "almacen_id" })
  almacen!: AlmacenOrmEntity;

  @OneToMany(() => MovimientoInsumoOrmEntity, (movimiento) => movimiento.insumo)
  movimientos!: MovimientoInsumoOrmEntity[];

  @OneToMany(() => ReservaOrmEntity, (reserva) => reserva.insumo)
  reservas!: ReservaOrmEntity[];
}
