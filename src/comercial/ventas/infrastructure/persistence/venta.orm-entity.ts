import { FacturaOrmEntity } from "src/comercial/factura/infrastructure/persistence/factura.orm-entity";
import { PagoOrmEntity } from "src/comercial/pagos/infrastructure/persistence/pago.orm-entity";
import { TransaccionFinancieraOrmEntity } from "src/comercial/transacciones_financieras/infrastructure/persistence/transaccion-financiera.orm-entity";
import { VentaDetalleOrmEntity } from "src/comercial/ventas_detalles/infrastructure/persistence/venta-detalle.orm-entity";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("ventas")
export class VentaOrmEntity {
  @PrimaryGeneratedColumn({ type: "integer" })
  id!: number;

  @Column({ type: "timestamp" })
  fecha!: Date;

  @Column({ name: "cliente_id", type: "integer" })
  clienteId!: number;

  @Column({ type: "double precision" })
  subtotal!: number;

  @Column({ type: "double precision" })
  impuestos!: number;

  @Column({ type: "double precision" })
  descuento!: number;

  @Column({ type: "double precision" })
  total!: number;

  @Column({ type: "varchar", length: 100 })
  estado!: string;

  @Column({ name: "usuario_id", type: "integer" })
  usuarioId!: number;

  @Column({ name: "anulada_por_usuario_id", type: "integer", nullable: true })
  anuladaPorUsuarioId?: number;

  @Column({ name: "fecha_anulacion", type: "timestamp", nullable: true })
  fechaAnulacion?: Date;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

  @DeleteDateColumn({ name: "deleted_at", nullable: true })
  deletedAt?: Date;

  @OneToMany(
    () => TransaccionFinancieraOrmEntity,
    (transaccion) => transaccion.venta,
  )
  transacciones!: TransaccionFinancieraOrmEntity[];

  @OneToMany(() => VentaDetalleOrmEntity, (detalle) => detalle.venta, {
    cascade: true,
  })
  detalles!: VentaDetalleOrmEntity[];

  @OneToMany(() => PagoOrmEntity, (pago) => pago.venta)
  pagos!: PagoOrmEntity[];

  @OneToOne(() => FacturaOrmEntity, (factura) => factura.venta)
  factura!: FacturaOrmEntity;
}
