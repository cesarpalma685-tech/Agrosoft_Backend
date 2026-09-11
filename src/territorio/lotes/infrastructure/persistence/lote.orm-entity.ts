import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
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
}
