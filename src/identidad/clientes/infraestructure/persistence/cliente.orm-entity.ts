import { VentaOrmEntity } from "src/comercial/ventas/infrastructure/persistence/venta.orm-entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from "typeorm";

@Entity("clientes")
export class ClienteOrmEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: "varchar",
  })
  nombre!: string;

  // NIT o CC
  @Column({ name: "tipo_identificacion", type: "varchar", length: 10, nullable: true })
  tipoIdentificacion!: string | null;

  @Column({
    type: "varchar",
    nullable: true,
  })
  identificacion!: string | null;

  @Column({
    type: "varchar",
    nullable: true,
  })
  telefono!: string | null;

  @Column({
    type: "varchar",
    nullable: true,
  })
  email!: string | null;

  @Column({
    type: "varchar",
    nullable: true,
  })
  direccion!: string | null;

  @Column({
    type: "text",
    nullable: true,
  })
  notas!: string | null;

  @CreateDateColumn()
  created_at!: Date;

  @OneToMany(() => VentaOrmEntity, (venta) => venta.cliente)
  venta!: VentaOrmEntity[];
}
