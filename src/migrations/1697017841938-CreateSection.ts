import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSections1697017841938 implements MigrationInterface {
  name = "CreateSections1697017841938";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "sections" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), "text" character varying NOT NULL, CONSTRAINT "PK_f9749dd3bffd880a497d007e450" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "sections"`);
  }
}
