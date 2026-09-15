import { VentaOrmEntity } from "src/comercial/ventas/infrastructure/persistence/venta.orm-entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";

@Entity("facturas")
export class FacturaOrmEntity {
  @PrimaryGeneratedColumn({ type: "integer" })
  id!: number;

  @Column({ name: "venta_id", type: "integer" })
  ventaId!: number;

  @Column({ type: "varchar", length: 50 })
  numero!: string;

  @Column({ type: "varchar", length: 20, nullable: true })
  prefijo?: string;

  @Column({ name: "fecha_emision", type: "timestamp" })
  fechaEmision!: Date;

  @Column({ type: "timestamp" })
  vencimiento!: Date;

  @Column({ name: "qr_url", type: "varchar", nullable: true })
  qrUrl?: string;

  @Column({ name: "pdf_url", type: "varchar", nullable: true })
  pdfUrl?: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

  @DeleteDateColumn({ name: "deleted_at", nullable: true })
  deletedAt?: Date;

  @OneToOne(() => VentaOrmEntity, { onDelete: "CASCADE" })
  @JoinColumn({ name: "venta_id" })
  venta!: VentaOrmEntity;
}
