import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateAlphaHostingRecords1714136607239 implements MigrationInterface {
    name = 'CreateAlphaHostingRecords1714136607239'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "alpha_hosting_records" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), "username" character varying NOT NULL, "uid" integer NOT NULL, "project_id" integer, CONSTRAINT "UQ_a41ea70c7dd75d62d8d4c5ccc03" UNIQUE ("username"), CONSTRAINT "UQ_c4f481df4c43e3ec01be3d445b4" UNIQUE ("uid"), CONSTRAINT "REL_7f404468b21cff1aa4bf488180" UNIQUE ("project_id"), CONSTRAINT "PK_d57884afca10b4a1648b98c8f4d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "alpha_hosting_records" ADD CONSTRAINT "FK_7f404468b21cff1aa4bf4881808" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "alpha_hosting_records" DROP CONSTRAINT "FK_7f404468b21cff1aa4bf4881808"`);
        await queryRunner.query(`DROP TABLE "alpha_hosting_records"`);
    }

}
