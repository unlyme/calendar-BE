import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateProjectServiceUnits1699461708182 implements MigrationInterface {
    name = 'CreateProjectServiceUnits1699461708182'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "project_service_units" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), "service_id" integer NOT NULL, "project_id" integer NOT NULL, CONSTRAINT "PK_a1d2fb6ee6213b1ecace1d60dd3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3ef8f8b17543f3affffd31061c" ON "project_service_units" ("service_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_1b1c27b5f5cdfa70ba0d740d0c" ON "project_service_units" ("project_id") `);
        await queryRunner.query(`ALTER TABLE "project_service_units" ADD CONSTRAINT "FK_3ef8f8b17543f3affffd31061cf" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_service_units" ADD CONSTRAINT "FK_1b1c27b5f5cdfa70ba0d740d0c1" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project_service_units" DROP CONSTRAINT "FK_1b1c27b5f5cdfa70ba0d740d0c1"`);
        await queryRunner.query(`ALTER TABLE "project_service_units" DROP CONSTRAINT "FK_3ef8f8b17543f3affffd31061cf"`);
        await queryRunner.query(`DROP TABLE "project_service_units"`);
    }
}
