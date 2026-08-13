import { MigrationInterface, QueryRunner } from "typeorm";

export class CrearTablaMovimientosProduccion1785796139422 implements MigrationInterface {
    name = 'CrearTablaMovimientosProduccion1785796139422'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "movimientos_produccion" ("id" SERIAL NOT NULL, "lote_produccion_id" integer NOT NULL, "tipo" character varying NOT NULL, "cantidad_kg" double precision NOT NULL, "costo_unitario_kg" double precision, "costo_total" double precision, "venta_id" integer, "descripcion" text, "usuario_id" integer, "fecha" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_b60c7034e7a75bb9249293644da" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "epas" ALTER COLUMN "meses_probables" SET DEFAULT ARRAY[]::integer[]`);
        await queryRunner.query(`ALTER TABLE "epas" ALTER COLUMN "temporadas" SET DEFAULT ARRAY[]::text[]`);
        await queryRunner.query(`ALTER TABLE "epas" ALTER COLUMN "fotos_sintomas" SET DEFAULT ARRAY[]::text[]`);
        await queryRunner.query(`ALTER TABLE "epas" ALTER COLUMN "fotos_generales" SET DEFAULT ARRAY[]::text[]`);
        await queryRunner.query(`ALTER TABLE "epas" ALTER COLUMN "tags" SET DEFAULT ARRAY[]::text[]`);
        await queryRunner.query(`ALTER TABLE "movimientos_produccion" ADD CONSTRAINT "FK_c154fb6d3326b5e1d0daacc25ae" FOREIGN KEY ("lote_produccion_id") REFERENCES "lotes_produccion"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movimientos_produccion" DROP CONSTRAINT "FK_c154fb6d3326b5e1d0daacc25ae"`);
        await queryRunner.query(`ALTER TABLE "epas" ALTER COLUMN "tags" SET DEFAULT ARRAY[]`);
        await queryRunner.query(`ALTER TABLE "epas" ALTER COLUMN "fotos_generales" SET DEFAULT ARRAY[]`);
        await queryRunner.query(`ALTER TABLE "epas" ALTER COLUMN "fotos_sintomas" SET DEFAULT ARRAY[]`);
        await queryRunner.query(`ALTER TABLE "epas" ALTER COLUMN "temporadas" SET DEFAULT ARRAY[]`);
        await queryRunner.query(`ALTER TABLE "epas" ALTER COLUMN "meses_probables" SET DEFAULT ARRAY[]`);
        await queryRunner.query(`DROP TABLE "movimientos_produccion"`);
    }

}
