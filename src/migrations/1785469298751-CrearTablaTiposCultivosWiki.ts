import { MigrationInterface, QueryRunner } from "typeorm";

export class CrearTablaTiposCultivosWiki1785469298751 implements MigrationInterface {
    name = 'CrearTablaTiposCultivosWiki1785469298751'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tipos_cultivos_wiki" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "descripcion" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_b6eab974e49fd96658f753c0886" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tipos_cultivos_wiki"`);
    }

}
