import { MigrationInterface, QueryRunner } from "typeorm";

export class CrearTablaEpaTiposCultivosWiki1785472573893 implements MigrationInterface {
    name = 'CrearTablaEpaTiposCultivosWiki1785472573893'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "epa_tipos_cultivos_wiki" ("epa_id" integer NOT NULL, "tipo_cultivo_wiki_id" integer NOT NULL, CONSTRAINT "PK_9f5da0e8aa0d4c1dc5db1f30a89" PRIMARY KEY ("epa_id", "tipo_cultivo_wiki_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_23cfaddd5ea355472c6c747707" ON "epa_tipos_cultivos_wiki"  ("epa_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_8a0c57a2bd4e19cdff143bd21d" ON "epa_tipos_cultivos_wiki"  ("tipo_cultivo_wiki_id") `);
        await queryRunner.query(`ALTER TABLE "epas" ALTER COLUMN "meses_probables" SET DEFAULT ARRAY[]::integer[]`);
        await queryRunner.query(`ALTER TABLE "epas" ALTER COLUMN "temporadas" SET DEFAULT ARRAY[]::text[]`);
        await queryRunner.query(`ALTER TABLE "epas" ALTER COLUMN "fotos_sintomas" SET DEFAULT ARRAY[]::text[]`);
        await queryRunner.query(`ALTER TABLE "epas" ALTER COLUMN "fotos_generales" SET DEFAULT ARRAY[]::text[]`);
        await queryRunner.query(`ALTER TABLE "epas" ALTER COLUMN "tags" SET DEFAULT ARRAY[]::text[]`);
        await queryRunner.query(`ALTER TABLE "epa_tipos_cultivos_wiki" ADD CONSTRAINT "FK_23cfaddd5ea355472c6c7477077" FOREIGN KEY ("epa_id") REFERENCES "epas"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "epa_tipos_cultivos_wiki" ADD CONSTRAINT "FK_8a0c57a2bd4e19cdff143bd21d6" FOREIGN KEY ("tipo_cultivo_wiki_id") REFERENCES "tipos_cultivos_wiki"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "epa_tipos_cultivos_wiki" DROP CONSTRAINT "FK_8a0c57a2bd4e19cdff143bd21d6"`);
        await queryRunner.query(`ALTER TABLE "epa_tipos_cultivos_wiki" DROP CONSTRAINT "FK_23cfaddd5ea355472c6c7477077"`);
        await queryRunner.query(`ALTER TABLE "epas" ALTER COLUMN "tags" SET DEFAULT ARRAY[]`);
        await queryRunner.query(`ALTER TABLE "epas" ALTER COLUMN "fotos_generales" SET DEFAULT ARRAY[]`);
        await queryRunner.query(`ALTER TABLE "epas" ALTER COLUMN "fotos_sintomas" SET DEFAULT ARRAY[]`);
        await queryRunner.query(`ALTER TABLE "epas" ALTER COLUMN "temporadas" SET DEFAULT ARRAY[]`);
        await queryRunner.query(`ALTER TABLE "epas" ALTER COLUMN "meses_probables" SET DEFAULT ARRAY[]`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8a0c57a2bd4e19cdff143bd21d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_23cfaddd5ea355472c6c747707"`);
        await queryRunner.query(`DROP TABLE "epa_tipos_cultivos_wiki"`);
    }

}
