import { InsumoOrmEntity } from "src/inventario/insumos/infrastructure/persistence/insumo.orm-entity";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("proveedores")
export class ProveedoresPersistence {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @CreateDateColumn({ name: "created_at" })
  created_at!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updated_at!: Date;

  @DeleteDateColumn({ name: "deleted_at", nullable: true })
  deleted_at?: Date;

  @OneToMany(() => InsumoOrmEntity, (insumo) => insumo.proveedorid)
  insumos!: InsumoOrmEntity[];
}
