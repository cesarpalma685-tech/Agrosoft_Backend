import { MigrationInterface, QueryRunner } from "typeorm";

export class CrearTablaCultivoHistorial1785789642490 implements MigrationInterface {
    name = 'CrearTablaCultivoHistorial1785789642490'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cultivo_historial" ("id" SERIAL NOT NULL, "cultivo_id" integer NOT NULL, "usuario_id" integer, "motivo" text, "cambios" jsonb, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_1444e12287840811dfcac8dd99d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "epas" ALTER COLUMN "meses_probables" SET DEFAULT ARRAY[]::integer[]`);
        await queryRunner.query(`ALTER TABLE "epas" ALTER COLUMN "temporadas" SET DEFAULT ARRAY[]::text[]`);
        await queryRunner.query(`ALTER TABLE "epas" ALTER COLUMN "fotos_sintomas" SET DEFAULT ARRAY[]::text[]`);
        await queryRunner.query(`ALTER TABLE "epas" ALTER COLUMN "fotos_generales" SET DEFAULT ARRAY[]::text[]`);
        await queryRunner.query(`ALTER TABLE "epas" ALTER COLUMN "tags" SET DEFAULT ARRAY[]::text[]`);
        await queryRunner.query(`ALTER TABLE "cultivo_historial" ADD CONSTRAINT "FK_7c6f6d2f445179a26f64174299c" FOREIGN KEY ("cultivo_id") REFERENCES "cultivos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cultivo_historial" DROP CONSTRAINT "FK_7c6f6d2f445179a26f64174299c"`);
        await queryRunner.query(`ALTER TABLE "epas" ALTER COLUMN "tags" SET DEFAULT ARRAY[]`);
        await queryRunner.query(`ALTER TABLE "epas" ALTER COLUMN "fotos_generales" SET DEFAULT ARRAY[]`);
        await queryRunner.query(`ALTER TABLE "epas" ALTER COLUMN "fotos_sintomas" SET DEFAULT ARRAY[]`);
        await queryRunner.query(`ALTER TABLE "epas" ALTER COLUMN "temporadas" SET DEFAULT ARRAY[]`);
        await queryRunner.query(`ALTER TABLE "epas" ALTER COLUMN "meses_probables" SET DEFAULT ARRAY[]`);
        await queryRunner.query(`DROP TABLE "cultivo_historial"`);
    }

}
