import { VentaOrmEntity } from 'src/comercial/ventas/infrastructure/persistence/venta.orm-entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('transacciones_financieras')
export class TransaccionFinancieraOrmEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id!: number;

  @Column({ type: 'varchar', length: 50 })
  tipo!: string;

  @Column({ type: 'varchar', length: 100 })
  categoria!: string;

  @Column({ type: 'double precision' })
  monto!: number;

  @Column({ type: 'text', nullable: true })
  descripcion?: string;

  @Column({ type: 'timestamp' })
  fecha!: Date;

  @Column({ name: 'actividad_id', type: 'integer', nullable: true })
  actividadId?: number;

  @Column({ name: 'insumo_id', type: 'integer', nullable: true })
  insumoId?: number;

  @Column({ name: 'venta_id', type: 'integer', nullable: true })
  ventaId?: number;

  @Column({ name: 'usuario_id', type: 'integer' })
  usuarioId!: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt?: Date;

    @ManyToOne(() => VentaOrmEntity, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'venta_id' })
  venta!: VentaOrmEntity;
}