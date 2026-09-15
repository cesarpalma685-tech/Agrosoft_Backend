import { VentaOrmEntity } from "src/comercial/ventas/infrastructure/persistence/venta.orm-entity";
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

@Entity("pagos")
export class PagoOrmEntity {
  @PrimaryGeneratedColumn({ type: "integer" })
  id!: number;

  @Column({ name: "venta_id", type: "integer" })
  ventaId!: number;

  @Column({ type: "varchar", length: 50 })
  metodo!: string;

  @Column({ type: "double precision" })
  monto!: number;

  @Column({ type: "varchar", length: 10 })
  moneda!: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  referencia?: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

  @DeleteDateColumn({ name: "deleted_at", nullable: true })
  deletedAt?: Date;

  @ManyToOne(() => VentaOrmEntity, (venta) => venta.pagos, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "venta_id" })
  venta!: VentaOrmEntity;
}
