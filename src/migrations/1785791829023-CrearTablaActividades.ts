import { MigrationInterface, QueryRunner } from "typeorm";

export class CrearTablaActividades1785791829023 implements MigrationInterface {
    name = 'CrearTablaActividades1785791829023'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "actividades" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "tipo" character varying NOT NULL, "subtipo" character varying, "lote_id" integer NOT NULL, "sub_lote_id" integer, "cultivo_id" integer NOT NULL, "fecha" TIMESTAMP NOT NULL, "horas_actividad" double precision, "precio_hora_actividad" double precision, "costo_mano_obra" double precision, "descripcion" text, "estado" character varying NOT NULL DEFAULT 'pendiente', "creado_por_usuario_id" integer, "cantidad_plantas" integer, "kg_recolectados" double precision, "producto_agro_id" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_03490866fef1c23456f0e289d9c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "epas" ALTER COLUMN "meses_probables" SET DEFAULT ARRAY[]::integer[]`);
        await queryRunner.query(`ALTER TABLE "epas" ALTER COLUMN "temporadas" SET DEFAULT ARRAY[]::text[]`);
        await queryRunner.query(`ALTER TABLE "epas" ALTER COLUMN "fotos_sintomas" SET DEFAULT ARRAY[]::text[]`);
        await queryRunner.query(`ALTER TABLE "epas" ALTER COLUMN "fotos_generales" SET DEFAULT ARRAY[]::text[]`);
        await queryRunner.query(`ALTER TABLE "epas" ALTER COLUMN "tags" SET DEFAULT ARRAY[]::text[]`);
        await queryRunner.query(`ALTER TABLE "actividades" ADD CONSTRAINT "FK_ae8b64d3b6ebc05eb108b3c5d9a" FOREIGN KEY ("cultivo_id") REFERENCES "cultivos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "actividades" DROP CONSTRAINT "FK_ae8b64d3b6ebc05eb108b3c5d9a"`);
        await queryRunner.query(`ALTER TABLE "epas" ALTER COLUMN "tags" SET DEFAULT ARRAY[]`);
        await queryRunner.query(`ALTER TABLE "epas" ALTER COLUMN "fotos_generales" SET DEFAULT ARRAY[]`);
        await queryRunner.query(`ALTER TABLE "epas" ALTER COLUMN "fotos_sintomas" SET DEFAULT ARRAY[]`);
        await queryRunner.query(`ALTER TABLE "epas" ALTER COLUMN "temporadas" SET DEFAULT ARRAY[]`);
        await queryRunner.query(`ALTER TABLE "epas" ALTER COLUMN "meses_probables" SET DEFAULT ARRAY[]`);
        await queryRunner.query(`DROP TABLE "actividades"`);
    }

}
