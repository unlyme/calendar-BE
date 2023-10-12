import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateServices1697017841941 implements MigrationInterface {
  name = "CreateServices1697017841941";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "services" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), "name" character varying NOT NULL, CONSTRAINT "PK_ba2d347a3168a296416c6c5ccb2" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "services"`);
  }
}
