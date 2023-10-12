import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProjects1697017841942 implements MigrationInterface {
  name = "CreateProjects1697017841942";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "projects" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), "name" character varying NOT NULL, "balance" numeric NOT NULL DEFAULT '0', "geography" character varying NOT NULL, "active" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "projects"`);
  }
}
