import { MovimientoInsumoOrmEntity } from "src/inventario/movimientos_isumos/infrastructure/persistence/movimiento-insumo.orm-entity";
import { MovimientoProduccionOrmEntity } from "src/producción/movimiento-produccion/infrastructure/persistence/movimiento-produccion.orm-entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('usuarios')
export class UsuarioOrmEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar' })
  nombre!: string;

  @Column({ type: 'varchar' })
  apellido!: string;

  @Column({ type: 'varchar', unique: true, nullable: true })
  identificacion!: string;

  @Column({ type: 'int', nullable: true })
  idFicha!: number;

  @Column({ type: 'varchar', nullable: true })
  programaFormacionId!: string | null;

  @Column({ type: 'varchar', nullable: true })
  telefono!: string | null;

  @Column({ type: 'varchar', unique: true })
  correo!: string;

  @Column({ type: 'varchar' })
  passwordHash!: string;

  @Column({ type: 'timestamp', nullable: true })
  lastLoginAt!: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  emailVerifiedAt!: Date | null;

  @Column({ type: 'varchar', default: 'activo' })
  estado!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;

  @OneToMany(() => MovimientoInsumoOrmEntity, (movimiento) => movimiento.usuario)
  movimientosInsumos!: MovimientoInsumoOrmEntity[];

  @OneToMany(()=>MovimientoProduccionOrmEntity,(movimiento)=>movimiento.usuario)
  movimientosProduccion!:MovimientoProduccionOrmEntity[];
}
