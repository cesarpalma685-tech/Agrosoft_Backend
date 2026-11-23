import { IotGlobalConfigPersistence } from 'src/iot/iot_global_config/infrastructure/persistence/iot_global_config.orm-entity';
import { SensorAlertasPersistence } from 'src/iot/sensor_alertas/infrastructure/persistence/sensor_alertas.orm-entity';
import { SensorOrmEntity } from 'src/iot/sensores/infrastructure/persistence/sensores.orm-entity';
import { SubloteOrmEntity } from 'src/territorio/sublotes/infrastructure/persistence/sublote.orm-entity';
import { ActividadOrmEntity } from 'src/produccion/actividad/infrastructure/persistence/actividad.orm-entity';
import { UnidadProductivaOrmEntity } from 'src/territorio/unidades_productivas/infrastructure/persistence/unidad-productiva.orm-entity';
import { LoteProduccionOrmEntity } from 'src/produccion/lote-produccion/infrastructure/persistence/lote-produccion.orm-entity';

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
} from "typeorm";

@Entity("lotes")
export class LoteOrmEntity {
  @PrimaryGeneratedColumn({ type: "integer" })
  id!: number;

  @Column({ type: "varchar" })
  nombre!: string;

  // Nullable para no romper lotes que ya existían antes de crear las unidades
  @Column({ type: "integer", nullable: true })
  unidad_productiva_id!: number | null;

  @ManyToOne(
    () => UnidadProductivaOrmEntity,
    (unidad: UnidadProductivaOrmEntity) => unidad.lotes,
    { nullable: true },
  )
  @JoinColumn({ name: "unidad_productiva_id" })
  unidadProductiva!: UnidadProductivaOrmEntity | null;

  @Column({
    type: "geometry",
    spatialFeatureType: "Polygon",
    srid: 4326,
    nullable: true,
  })
  geom!: object | null;

  @Column({ type: "numeric", precision: 12, scale: 2 })
  areaM2!: number;

  @Column({ type: "numeric", precision: 12, scale: 4 })
  areaHa!: number;

  @Column({
    type: "geometry",
    spatialFeatureType: "Point",
    srid: 4326,
    nullable: true,
  })
  centroide!: object | null;

  @Column({ type: "varchar", nullable: true })
  descripcion!: string | null;

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