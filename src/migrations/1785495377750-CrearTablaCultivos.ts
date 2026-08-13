import { MigrationInterface, QueryRunner } from "typeorm";

export class CrearTablaCultivos1785495377750 implements MigrationInterface {
    name = 'CrearTablaCultivos1785495377750'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cultivos" ("id" SERIAL NOT NULL, "nombre_cultivo" character varying NOT NULL, "tipo_cultivo" character varying NOT NULL, "descripcion" text, "lote_id" integer NOT NULL, "sublote_id" integer, "img_cultivo" character varying, "fecha_siembra" date NOT NULL, "fecha_finalizacion" date, "costo_total" numeric(12,2) NOT NULL DEFAULT '0', "estado" character varying NOT NULL DEFAULT 'activo', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_f7b1d6fc0a6976acd023dca2d3d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "epas" ALTER COLUMN "meses_probables" SET DEFAULT ARRAY[]::integer[]`);
        await queryRunner.query(`ALTER TABLE "epas" ALTER COLUMN "temporadas" SET DEFAULT ARRAY[]::text[]`);
        await queryRunner.query(`ALTER TABLE "epas" ALTER COLUMN "fotos_sintomas" SET DEFAULT ARRAY[]::text[]`);
        await queryRunner.query(`ALTER TABLE "epas" ALTER COLUMN "fotos_generales" SET DEFAULT ARRAY[]::text[]`);
        await queryRunner.query(`ALTER TABLE "epas" ALTER COLUMN "tags" SET DEFAULT ARRAY[]::text[]`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "epas" ALTER COLUMN "tags" SET DEFAULT ARRAY[]`);
        await queryRunner.query(`ALTER TABLE "epas" ALTER COLUMN "fotos_generales" SET DEFAULT ARRAY[]`);
        await queryRunner.query(`ALTER TABLE "epas" ALTER COLUMN "fotos_sintomas" SET DEFAULT ARRAY[]`);
        await queryRunner.query(`ALTER TABLE "epas" ALTER COLUMN "temporadas" SET DEFAULT ARRAY[]`);
        await queryRunner.query(`ALTER TABLE "epas" ALTER COLUMN "meses_probables" SET DEFAULT ARRAY[]`);
        await queryRunner.query(`DROP TABLE "cultivos"`);
    }

}
