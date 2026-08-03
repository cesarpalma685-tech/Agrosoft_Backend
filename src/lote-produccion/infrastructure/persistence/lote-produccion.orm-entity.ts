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
import { CultivoOrmEntity } from '../../../cultivo/infrastructure/persistence/cultivo.orm-entity';
import { ActividadOrmEntity } from '../../../actividad/infrastructure/persistence/actividad.orm-entity';

@Entity('lotes_produccion')
export class LoteProduccionOrmEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'producto_agro_id', type: 'int', nullable: true })
  productoAgroId!: number | null;

  @Column({ name: 'cultivo_id', type: 'int' })
  cultivoId!: number;

  @ManyToOne(() => CultivoOrmEntity)
  @JoinColumn({ name: 'cultivo_id' })
  cultivo!: CultivoOrmEntity;

  @Column({ name: 'lote_id', type: 'int' })
  loteId!: number;

  @Column({ name: 'sub_lote_id', type: 'int', nullable: true })
  subLoteId!: number | null;

  @Column({ name: 'actividad_cosecha_id', type: 'int', nullable: true })
  actividadCosechaId!: number | null;

  @ManyToOne(() => ActividadOrmEntity, { nullable: true })
  @JoinColumn({ name: 'actividad_cosecha_id' })
  actividadCosecha!: ActividadOrmEntity | null;

  @Column({ type: 'varchar', nullable: true })
  calidad!: string | null;

  @Column({ name: 'cantidad_kg', type: 'double precision' })
  cantidadKg!: number;

  @Column({ name: 'stock_disponible_kg', type: 'double precision' })
  stockDisponibleKg!: number;

  @Column({ name: 'costo_unitario_kg', type: 'double precision', nullable: true })
  costoUnitarioKg!: number | null;

  @Column({ name: 'costo_total', type: 'double precision', nullable: true })
  costoTotal!: number | null;

  @Column({ name: 'precio_sugerido_kg', type: 'double precision', nullable: true })
  precioSugeridoKg!: number | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt!: Date | null;
}