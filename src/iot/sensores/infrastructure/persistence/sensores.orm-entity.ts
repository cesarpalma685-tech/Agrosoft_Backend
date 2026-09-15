import { IotGlobalConfigPersistence } from 'src/iot/iot_global_config/infrastructure/persistence/iot_global_config.orm-entity';
import { SensorAlertasPersistence } from 'src/iot/sensor_alertas/infrastructure/persistence/sensor_alertas.orm-entity';
import { SensorLecturasOrmEntity } from 'src/iot/sensor_lecturas/infrastructure/persistence/sensor_lecturas.orm-entity';
import { TiposSensoresOrmEntity } from 'src/iot/tipos_sensores/infrastructure/persistence/tipos_sensores.orm-entity';
import { LoteOrmEntity } from 'src/territorio/lotes/infrastructure/persistence/lote.orm-entity';
import { SubloteOrmEntity } from 'src/territorio/sublotes/infrastructure/persistence/sublote.orm-entity';
import { CultivoOrmEntity } from 'src/produccion/cultivo/infrastructure/persistence/cultivo.orm-entity';

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

@Entity('sensores')
export class SensorOrmEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar' })
  nombre_sensor!: string;

  @Column({ type: 'integer', insert: false, update: false })
  tipo_sensor_id!: number;

  @ManyToOne(() => TiposSensoresOrmEntity, (tipo) => tipo.sensores)
  @JoinColumn({ name: 'tipo_sensor_id' })
  tipoSensor!: TiposSensoresOrmEntity;

  @Column({ type: 'varchar' })
  protocolo!: string;

  @Column({ type: 'varchar', nullable: true })
  endpoint_url!: string | null;

  @Column({ type: 'varchar', nullable: true })
  mqtt_topic!: string | null;

  @Column({ type: 'numeric', nullable: true })
  valor_minimo_sensor!: number | null;

  @Column({ type: 'numeric', nullable: true })
  valor_maximo_sensor!: number | null;

  @Column({ type: 'boolean', default: true })
  activo!: boolean;

  @Column({ type: 'varchar', nullable: true })
  estado_conexion!: string | null;

  @Column({ type: 'varchar', nullable: true })
  estado!: string | null;

  @Column({ type: 'varchar', nullable: true })
  ultimo_valor!: string | null;

  @Column({ type: 'timestamp', nullable: true })
  ultima_medicion!: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  last_seen_at!: Date | null;

  // --- FK externas (a los módulos de mis compañeros de trabajo en el modulo cultivo)

  @Column({ type: 'integer', insert: false, update: false })
  cultivoId!: number;

  @ManyToOne(() => CultivoOrmEntity)
  @JoinColumn({ name: 'cultivoId' })
  cultivo!: CultivoOrmEntity;

  @Column({ type: 'integer' })
  creadoPorUsuarioId!: number;

  // --- FK internas (con mis 10 módulos) ---

  @Column({ type: 'integer', insert: false, update: false })
  global_config_id!: number;

  @ManyToOne(() => IotGlobalConfigPersistence, (config) => config.sensores)
  @JoinColumn({ name: 'global_config_id' })
  globalConfig!: IotGlobalConfigPersistence;

  @Column({ type: 'integer', insert: false, update: false })
  lote_id!: number;

  @ManyToOne(() => LoteOrmEntity, (lote) => lote.sensores)
  @JoinColumn({ name: 'lote_id' })
  lote!: LoteOrmEntity;

  @Column({ type: 'integer', insert: false, update: false })
  sub_lote_id!: number;

  @ManyToOne(() => SubloteOrmEntity, (sublote) => sublote.sensores)
  @JoinColumn({ name: 'sub_lote_id' })
  sublote!: SubloteOrmEntity;

  @OneToMany(() => SensorLecturasOrmEntity, (lectura: SensorLecturasOrmEntity) => lectura.sensor)
  lecturas!: SensorLecturasOrmEntity[];

  @OneToMany(() => SensorAlertasPersistence, (alerta: SensorAlertasPersistence) => alerta.sensor)
  alertas!: SensorAlertasPersistence[];

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at!: Date | null;
}