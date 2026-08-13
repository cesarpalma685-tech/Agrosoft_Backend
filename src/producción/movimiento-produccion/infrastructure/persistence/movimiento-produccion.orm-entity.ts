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
import { LoteProduccionOrmEntity } from '../../../lote-produccion/infrastructure/persistence/lote-produccion.orm-entity';
import { UsuarioOrmEntity } from 'src/identidad/usuarios/infrastructure/persistence/usuario.orm-entity';

@Entity('movimientos_produccion')
export class MovimientoProduccionOrmEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'lote_produccion_id', type: 'int' })
  loteProduccionId!: number;

  @ManyToOne(() => LoteProduccionOrmEntity)
  @JoinColumn({ name: 'lote_produccion_id' })
  loteProduccion!: LoteProduccionOrmEntity;

  @Column({ type: 'varchar' })
  tipo!: string;

  @Column({ name: 'cantidad_kg', type: 'double precision' })
  cantidadKg!: number;

  @Column({ name: 'costo_unitario_kg', type: 'double precision', nullable: true })
  costoUnitarioKg!: number | null;

  @Column({ name: 'costo_total', type: 'double precision', nullable: true })
  costoTotal!: number | null;

  @Column({ name: 'venta_id', type: 'int', nullable: true })
  ventaId!: number | null;

  @Column({ type: 'text', nullable: true })
  descripcion!: string | null;

  @Column({ name: 'usuario_id', type: 'int', nullable: true })
  usuarioId!: number | null;

  @Column({ type: 'timestamp' })
  fecha!: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt!: Date | null;

  @ManyToOne(()=> UsuarioOrmEntity, (usuario) => usuario.movimientosProduccion,{
    onDelete: 'RESTRICT', // Evita borrar el usuario si tiene movimientos registrados
  })
  @JoinColumn({name:'usuario_id' })
    usuario!: UsuarioOrmEntity;
}