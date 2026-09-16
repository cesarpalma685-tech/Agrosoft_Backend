import { IotGlobalConfigPersistence } from 'src/iot/iot_global_config/infrastructure/persistence/iot_global_config.orm-entity';
import { SensorAlertasPersistence } from 'src/iot/sensor_alertas/infrastructure/persistence/sensor_alertas.orm-entity';
import { SensorOrmEntity } from 'src/iot/sensores/infrastructure/persistence/sensores.orm-entity';
import { SubloteOrmEntity } from 'src/territorio/sublotes/infrastructure/persistence/sublote.orm-entity';
import { ActividadOrmEntity } from 'src/produccion/actividad/infrastructure/persistence/actividad.orm-entity';
import { LoteProduccionOrmEntity } from 'src/produccion/lote-produccion/infrastructure/persistence/lote-produccion.orm-entity';

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("lotes")
export class LoteOrmEntity {
  @PrimaryGeneratedColumn({ type: "integer" })
  id!: number;

  @Column({ type: "varchar" })
  nombre!: string;

  @Column({
    type: "geometry",
    spatialFeatureType: "Polygon",
    srid: 4326,
  })
  geom!: object;

  @Column({ type: "numeric", precision: 12, scale: 2 })
  areaM2!: number;

  @Column({ type: "numeric", precision: 12, scale: 4 })
  areaHa!: number;

  @Column({
    type: "geometry",
    spatialFeatureType: "Point",
    srid: 4326,
  })
  centroide!: object;

  @Column({ type: "varchar" })
  descripcion!: string;

  @Column({ type: "varchar" })
  estado!: string;

  @CreateDateColumn({ type: "timestamp" })
  created_at!: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updated_at!: Date;

  @DeleteDateColumn({ type: "timestamp", nullable: true })
  deleted_at!: Date | null;

  // --- relaciones ---

  @OneToMany(
    () => SubloteOrmEntity,
    (sublote: SubloteOrmEntity) => sublote.lote
  )
  sublotes!: SubloteOrmEntity[];

  @OneToMany(
    () => LoteProduccionOrmEntity,
    (loteProduccion: LoteProduccionOrmEntity) =>
      loteProduccion.lote
  )
  lotesProduccion!: LoteProduccionOrmEntity[];

  @OneToMany(
    () => ActividadOrmEntity,
    (actividad: ActividadOrmEntity) => actividad.lote
  )
  actividades!: ActividadOrmEntity[];

  @OneToMany(
    () => SensorOrmEntity,
    (sensor: SensorOrmEntity) => sensor.lote
  )
  sensores!: SensorOrmEntity[];

  @OneToMany(
    () => SensorAlertasPersistence,
    (alerta: SensorAlertasPersistence) => alerta.lote
  )
  alertas!: SensorAlertasPersistence[];

  @OneToMany(
    () => IotGlobalConfigPersistence,
    (config: IotGlobalConfigPersistence) => config.lote
  )
  iotConfigs!: IotGlobalConfigPersistence[];
}