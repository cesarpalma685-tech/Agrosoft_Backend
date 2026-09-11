import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ReservaEstadoEnum } from "../../domain/enums/reserva-estado.enum";
import { InsumoOrmEntity } from "src/inventario/insumos/infrastructure/persistence/insumo.orm-entity";

@Entity("reservas")
export class ReservaOrmEntity {
  @PrimaryGeneratedColumn({ type: "integer" })
  id!: number;

  @Column({ name: "insumo_id", type: "integer" })
  insumoId!: number;

  @Column({ type: "double precision" })
  cantidad!: number;

  @Column({ name: "fecha_reserva", type: "date" })
  fechaReserva!: Date;

  @Column({ type: "varchar", length: 255 })
  motivo!: string;

  @Column({
    type: "enum",
    enum: ReservaEstadoEnum,
    default: ReservaEstadoEnum.PENDIENTE,
  })
  estado!: ReservaEstadoEnum;

  @Column({ name: "usuario_id", type: "integer" })
  usuarioId!: number;

  @Column({ name: "actividad_id", type: "integer" })
  actividadId!: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

  @DeleteDateColumn({ name: "deleted_at", nullable: true })
  deletedAt?: Date;

  @ManyToOne(() => InsumoOrmEntity, (insumo) => insumo.reservas, {
    onDelete: "RESTRICT",
  })
  @JoinColumn({ name: "insumo_id" })
  insumo!: InsumoOrmEntity;
}
