import { MigrationInterface, QueryRunner } from "typeorm";

export class CrearTablaLotesProduccion1785792692704 implements MigrationInterface {
    name = 'CrearTablaLotesProduccion1785792692704'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "lotes_produccion" ("id" SERIAL NOT NULL, "producto_agro_id" integer, "cultivo_id" integer NOT NULL, "lote_id" integer NOT NULL, "sub_lote_id" integer, "actividad_cosecha_id" integer, "calidad" character varying, "cantidad_kg" double precision NOT NULL, "stock_disponible_kg" double precision NOT NULL, "costo_unitario_kg" double precision, "costo_total" double precision, "precio_sugerido_kg" double precision, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_245f08534328efe79cc2cc1ccd8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "epas" ALTER COLUMN "meses_probables" SET DEFAULT ARRAY[]::integer[]`);
        await queryRunner.query(`ALTER TABLE "epas" ALTER COLUMN "temporadas" SET DEFAULT ARRAY[]::text[]`);
        await queryRunner.query(`ALTER TABLE "epas" ALTER COLUMN "fotos_sintomas" SET DEFAULT ARRAY[]::text[]`);
        await queryRunner.query(`ALTER TABLE "epas" ALTER COLUMN "fotos_generales" SET DEFAULT ARRAY[]::text[]`);
        await queryRunner.query(`ALTER TABLE "epas" ALTER COLUMN "tags" SET DEFAULT ARRAY[]::text[]`);
        await queryRunner.query(`ALTER TABLE "lotes_produccion" ADD CONSTRAINT "FK_2dd2d8a856bfe22dc889e476002" FOREIGN KEY ("cultivo_id") REFERENCES "cultivos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lotes_produccion" ADD CONSTRAINT "FK_6804d9b5ef53a1446f88b195cfa" FOREIGN KEY ("actividad_cosecha_id") REFERENCES "actividades"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lotes_produccion" DROP CONSTRAINT "FK_6804d9b5ef53a1446f88b195cfa"`);
        await queryRunner.query(`ALTER TABLE "lotes_produccion" DROP CONSTRAINT "FK_2dd2d8a856bfe22dc889e476002"`);
        await queryRunner.query(`ALTER TABLE "epas" ALTER COLUMN "tags" SET DEFAULT ARRAY[]`);
        await queryRunner.query(`ALTER TABLE "epas" ALTER COLUMN "fotos_generales" SET DEFAULT ARRAY[]`);
        await queryRunner.query(`ALTER TABLE "epas" ALTER COLUMN "fotos_sintomas" SET DEFAULT ARRAY[]`);
        await queryRunner.query(`ALTER TABLE "epas" ALTER COLUMN "temporadas" SET DEFAULT ARRAY[]`);
        await queryRunner.query(`ALTER TABLE "epas" ALTER COLUMN "meses_probables" SET DEFAULT ARRAY[]`);
        await queryRunner.query(`DROP TABLE "lotes_produccion"`);
    }

}
