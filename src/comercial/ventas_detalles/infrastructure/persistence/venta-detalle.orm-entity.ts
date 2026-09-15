import { ProductosAgroPersistence } from "src/catalogos/productos_agro/infrastructure/persistence/productos_agro.orm-entity";
import { VentaOrmEntity } from "src/comercial/ventas/infrastructure/persistence/venta.orm-entity";
import { LoteProduccionOrmEntity } from "src/produccion/lote-produccion/infrastructure/persistence/lote-produccion.orm-entity";
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

@Entity("ventas_detalles")
export class VentaDetalleOrmEntity {
  @PrimaryGeneratedColumn({ type: "integer" })
  id!: number;

  @Column({ name: "venta_id", type: "integer" })
  ventaId!: number;

  @Column({ name: "producto_agro_id", type: "integer" })
  productoAgroId!: number;

  @Column({ name: "lote_produccion_id", type: "integer", nullable: true })
  loteProduccionId?: number;

  @Column({ name: "cultivo_id", type: "integer", nullable: true })
  cultivoId?: number;

  @Column({ name: "cantidad_kg", type: "double precision" })
  cantidadKg!: number;

  @Column({ name: "precio_unitario_kg", type: "double precision" })
  precioUnitarioKg!: number;

  @Column({ name: "precio_total", type: "double precision" })
  precioTotal!: number;

  @Column({ name: "costo_unitario_kg", type: "double precision" })
  costoUnitarioKg!: number;

  @Column({ name: "costo_total", type: "double precision" })
  costoTotal!: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

  @DeleteDateColumn({ name: "deleted_at", nullable: true })
  deletedAt?: Date;

  @ManyToOne(() => VentaOrmEntity, (venta) => venta.detalles, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "venta_id" })
  venta!: VentaOrmEntity;

  @ManyToOne(()=> ProductosAgroPersistence, (productoagro) =>productoagro.ventasdetalles)
  @JoinColumn({name: "producto_agro_id"})
  productoagro!: ProductosAgroPersistence;

  @ManyToOne(()=> LoteProduccionOrmEntity, (lote) =>lote.ventasDetalles)
  @JoinColumn({name: "lote_produccion_id"})
  loteProduccion!: LoteProduccionOrmEntity;
}
