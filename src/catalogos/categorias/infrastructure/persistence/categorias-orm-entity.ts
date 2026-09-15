import { InsumoOrmEntity } from "src/inventario/insumos/infrastructure/persistence/insumo.orm-entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("categorias")
export class CategoriasPersistence {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  nombre!: string;

  @Column()
  descripcion!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(()=> InsumoOrmEntity, (insumo) => insumo.categoriaid)
  insumos!:InsumoOrmEntity[];
}
