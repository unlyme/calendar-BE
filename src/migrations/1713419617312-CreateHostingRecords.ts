import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateHostingRecords1713419617312 implements MigrationInterface {
    name = 'CreateHostingRecords1713419617312'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "hosting_records" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), "cpanel_username" character varying NOT NULL, "project_id" integer, CONSTRAINT "UQ_ecc0b029fa6d147a4dc963d8303" UNIQUE ("cpanel_username"), CONSTRAINT "REL_432664c8fc528070ce0dce53eb" UNIQUE ("project_id"), CONSTRAINT "PK_97413e35f07d085179eee7ab70b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "hosting_records" ADD CONSTRAINT "FK_432664c8fc528070ce0dce53ebf" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hosting_records" DROP CONSTRAINT "FK_432664c8fc528070ce0dce53ebf"`);
        await queryRunner.query(`DROP TABLE "hosting_records"`);
    }

}
