import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('historial_precios_lote')
export class HistorialPrecioLoteOrmEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id!: number;

  @Column({ name: 'lote_produccion_id', type: 'integer' })
  loteProduccionId!: number;

  @Column({ name: 'precio_anterior', type: 'double precision' })
  precioAnterior!: number;

  @Column({ name: 'precio_nuevo', type: 'double precision' })
  precioNuevo!: number;

  @Column({ name: 'usuario_id', type: 'integer' })
  usuarioId!: number;

  @Column({ type: 'timestamp' })
  fecha!: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  razon?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt?: Date;
}