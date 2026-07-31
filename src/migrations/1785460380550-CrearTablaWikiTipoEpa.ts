import { MigrationInterface, QueryRunner } from "typeorm";

export class CrearTablaWikiTipoEpa1785460380550 implements MigrationInterface {
    name = 'CrearTablaWikiTipoEpa1785460380550'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "wiki_tipo_epa" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "descripcion" text, "tipo_epa_enum" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_9dfa111ec6b634a076d666fd852" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "wiki_tipo_epa"`);
    }

}
