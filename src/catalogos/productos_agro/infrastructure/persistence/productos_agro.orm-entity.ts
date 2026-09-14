import { VentaDetalleOrmEntity } from "src/comercial/ventas_detalles/infrastructure/persistence/venta-detalle.orm-entity";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("productos_agro")
export class ProductosAgroPersistence {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column({ name: "unidad_base" })
  unidadBase!: string;

  @Column()
  descripcion!: string;

  @Column({ nullable: true })
  imagen?: string;

  @CreateDateColumn({ name: "created_at" })
  created_at!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updated_at!: Date;

  @DeleteDateColumn({ name: "deleted_at", nullable: true })
  deleted_at?: Date;

  @OneToMany(()=> VentaDetalleOrmEntity, (ventadetalle)=> ventadetalle.productoagro)
  ventasdetalles!: VentaDetalleOrmEntity[];
}
