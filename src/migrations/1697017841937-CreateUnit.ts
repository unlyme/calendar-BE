import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUnits1697017841937 implements MigrationInterface {
  name = "CreateUnits1697017841937";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "units" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), "value" character varying NOT NULL, CONSTRAINT "PK_4252c4be609041e559f0c80f58a" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "units"`);
  }
}
