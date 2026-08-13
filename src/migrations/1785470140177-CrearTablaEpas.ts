import { MigrationInterface, QueryRunner } from "typeorm";

export class CrearTablaEpas1785470140177 implements MigrationInterface {
    name = 'CrearTablaEpas1785470140177'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "epas" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "tipo_epa" character varying NOT NULL, "descripcion" text, "sintomas" text, "manejo_y_control" text, "meses_probables" integer array NOT NULL DEFAULT ARRAY[]::integer[], "temporadas" text array NOT NULL DEFAULT ARRAY[]::text[], "notas_estacionalidad" text, "fotos_sintomas" text array NOT NULL DEFAULT ARRAY[]::text[], "fotos_generales" text array NOT NULL DEFAULT ARRAY[]::text[], "tags" text array NOT NULL DEFAULT ARRAY[]::text[], "creado_por_usuario_id" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_8d23543eb1e7a3929bdf5b5805a" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "epas"`);
    }

}
