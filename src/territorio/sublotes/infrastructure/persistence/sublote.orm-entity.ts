import { IotGlobalConfigPersistence } from 'src/iot/iot_global_config/infrastructure/persistence/iot_global_config.orm-entity';
import { SensorAlertasPersistence } from 'src/iot/sensor_alertas/infrastructure/persistence/sensor_alertas.orm-entity';
import { SensorOrmEntity } from 'src/iot/sensores/infrastructure/persistence/sensores.orm-entity';
import { LoteOrmEntity } from 'src/territorio/lotes/infrastructure/persistence/lote.orm-entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';



@Entity('sublotes')
export class SubloteOrmEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id!: number;

  @Column({ type: 'varchar' })
  nombre!: string;

  @Column({ type: 'integer', insert: false, update: false })
  lote_id!: number;

  @ManyToOne(() => LoteOrmEntity, (lote: LoteOrmEntity) => lote.sublotes)
  @JoinColumn({ name: 'lote_id' })
  lote!: LoteOrmEntity;

  @Column({
    type: 'geometry',
    spatialFeatureType: 'Polygon',
    srid: 4326,
  })
  geom!: object;

  @Column({ type: 'numeric', precision: 12, scale: 2 })
  areaM2!: number;

  @Column({ type: 'numeric', precision: 12, scale: 4 })
  areaHa!: number;

  @Column({
    type: 'geometry',
    spatialFeatureType: 'Point',
    srid: 4326,
  })
  centroide!: object;

  @Column({ type: 'varchar' })
  descripcion!: string;

  @Column({ type: 'varchar' })
  estado!: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at!: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deleted_at!: Date | null;

  @OneToMany(() => SensorOrmEntity, (sensor: SensorOrmEntity) => sensor.sublote)
  sensores!: SensorOrmEntity[];

  @OneToMany(() => IotGlobalConfigPersistence, (config: IotGlobalConfigPersistence) => config.sublote)
  iotConfigs!: IotGlobalConfigPersistence[];

  @OneToMany(() => SensorAlertasPersistence, (alerta: SensorAlertasPersistence) => alerta.sublote)
  alertas!: SensorAlertasPersistence[];
}