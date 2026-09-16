import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";

import { CultivoOrmEntity } from "../../../cultivo/infrastructure/persistence/cultivo.orm-entity";
import { LoteProduccionOrmEntity } from "../../../lote-produccion/infrastructure/persistence/lote-produccion.orm-entity";
import { ProductosAgroPersistence } from "../../../../catalogos/productos_agro/infrastructure/persistence/productos_agro.orm-entity";
import { ActividadResponsableOrmEntity } from "src/actividades_detalles/actividades_responsable/infrastructure/persistence/actividad-responsable.orm-entity";
import { ActividadEvidenciaOrmEntity } from "src/actividades_detalles/actividades_evidencias/infrastructure/persistence/actividad-evidencia.orm-entity";
import { ActividadServicioOrmEntity } from "src/actividades_detalles/actividades_servicios/infrastructure/persistence/actividad-servicio.orm-entity";
import { ActividadHerramientaOrmEntity } from "src/actividades_detalles/actividades_herramientas/infrastructure/persistence/actividad-herramienta.orm-entity";
import { ActividadHistorialOrmEntity } from "src/actividades_detalles/actividades_historial/infrastructure/persistence/actividad-historial.orm-entity";
import { ActividadInsumoOrmEntity } from "src/actividades_detalles/actividades_insumos/infrastructure/persistence/actividad-insumo.orm-entity";
import { ActividadInsumoReservaOrmEntity } from "src/actividades_detalles/actividades_insumos_reversa/infrastructure/persistence/actividad-insumo-reserva.orm-entity";
import { ActividadInsumoUsoOrmEntity } from "src/actividades_detalles/actividades_insumos_uso/infrastructure/persistence/actividad-insumo-uso.orm-entity";
import { UsoHerramientaOrmEntity } from "src/actividades_detalles/usos_herramientas/infrastructure/persistence/uso-herramienta.orm-entity";
import { ReservaOrmEntity } from "src/inventario/reservas/infrastructure/persistence/reserva.orm-entity";
import { MovimientoInsumoOrmEntity } from "src/inventario/movimientos_isumos/infrastructure/persistence/movimiento-insumo.orm-entity";
import { TransaccionFinancieraOrmEntity } from "src/comercial/transacciones_financieras/infrastructure/persistence/transaccion-financiera.orm-entity";
import { LoteOrmEntity } from 'src/territorio/lotes/infrastructure/persistence/lote.orm-entity';
import { SubloteOrmEntity } from 'src/territorio/sublotes/infrastructure/persistence/sublote.orm-entity';

@Entity("actividades")
export class ActividadOrmEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar" })
  nombre!: string;

  @Column({ type: "varchar" })
  tipo!: string;

  @Column({ type: "varchar", nullable: true })
  subtipo!: string | null;

  @Column({ name: "lote_id", type: "int" })
  loteId!: number;

  @ManyToOne(() => LoteOrmEntity, (lote: LoteOrmEntity) => lote.actividades)
  @JoinColumn({ name: "lote_id" })
  lote!: LoteOrmEntity;

  @Column({ name: "sub_lote_id", type: "int", nullable: true })
  subLoteId!: number | null;

  @ManyToOne(
  () => SubloteOrmEntity,
  (sublote: SubloteOrmEntity) => sublote.actividades,
  { nullable: true }
  )
  @JoinColumn({ name: "sub_lote_id" })
  sublote!: SubloteOrmEntity | null;

  @Column({ name: "cultivo_id", type: "int" })
  cultivoId!: number;

  @ManyToOne(() => CultivoOrmEntity)
  @JoinColumn({ name: "cultivo_id" })
  cultivo!: CultivoOrmEntity;

  @Column({ type: "timestamp" })
  fecha!: Date;

  @Column({
    name: "horas_actividad",
    type: "double precision",
    nullable: true,
  })
  horasActividad!: number | null;

  @Column({
    name: "precio_hora_actividad",
    type: "double precision",
    nullable: true,
  })
  precioHoraActividad!: number | null;

  @Column({
    name: "costo_mano_obra",
    type: "double precision",
    nullable: true,
  })
  costoManoObra!: number | null;

  @Column({ type: "text", nullable: true })
  descripcion!: string | null;

  @Column({ type: "varchar", default: "pendiente" })
  estado!: string;

  @Column({
    name: "creado_por_usuario_id",
    type: "int",
    nullable: true,
  })
  creadoPorUsuarioId!: number | null;

  @Column({
    name: "cantidad_plantas",
    type: "int",
    nullable: true,
  })
  cantidadPlantas!: number | null;

  @Column({
    name: "kg_recolectados",
    type: "double precision",
    nullable: true,
  })
  kgRecolectados!: number | null;

  @Column({
    name: "producto_agro_id",
    type: "int",
    nullable: true,
  })
  productoAgroId!: number | null;

  @ManyToOne(() => ProductosAgroPersistence, { nullable: true })
  @JoinColumn({ name: "producto_agro_id" })
  productoAgro!: ProductosAgroPersistence | null;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt!: Date | null;

  @OneToMany(
    () => LoteProduccionOrmEntity,
    (l) => l.actividadCosecha,
  )
  lotesProduccion!: LoteProduccionOrmEntity[];

  @OneToMany(
    () => ActividadResponsableOrmEntity,
    (ar) => ar.actividad,
  )
  actividadesResponsables!: ActividadResponsableOrmEntity[];

  @OneToMany(
    () => ActividadEvidenciaOrmEntity,
    (ae) => ae.actividad,
  )
  actividadesEvidencias!: ActividadEvidenciaOrmEntity[];

  @OneToMany(
    () => ActividadServicioOrmEntity,
    (as) => as.actividad,
  )
  actividadesServicios!: ActividadServicioOrmEntity[];

  @OneToMany(
    () => ActividadHerramientaOrmEntity,
    (ah) => ah.actividad,
  )
  actividadesHerramientas!: ActividadHerramientaOrmEntity[];

  @OneToMany(
    () => ActividadHistorialOrmEntity,
    (ahi) => ahi.actividad,
  )
  actividadesHistorial!: ActividadHistorialOrmEntity[];

  @OneToMany(
    () => ActividadInsumoOrmEntity,
    (ai) => ai.actividad,
  )
  actividadInsumos!: ActividadInsumoOrmEntity[];

  @OneToMany(
    () => ActividadInsumoReservaOrmEntity,
    (air) => air.actividad,
  )
  actividadInsumosReserva!: ActividadInsumoReservaOrmEntity[];

  @OneToMany(
    () => ActividadInsumoUsoOrmEntity,
    (aiu) => aiu.actividad,
  )
  actividadInsumosUso!: ActividadInsumoUsoOrmEntity[];

  @OneToMany(
    () => UsoHerramientaOrmEntity,
    (uh) => uh.actividad,
  )
  usosHerramientas!: UsoHerramientaOrmEntity[];

  @OneToMany(
    () => ReservaOrmEntity,
    (re) => re.actividad,
  )
  reserva!: ReservaOrmEntity[];

  @OneToMany(
    () => MovimientoInsumoOrmEntity,
    (mi) => mi.actividad,
  )
  movimientosInsumos!: MovimientoInsumoOrmEntity[];

  @OneToMany(
    () => TransaccionFinancieraOrmEntity,
    (tf) => tf.actividad,
  )
  transaccionesFinancieras!: TransaccionFinancieraOrmEntity[];
}