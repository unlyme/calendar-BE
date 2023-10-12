import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCalendars1697017841936 implements MigrationInterface {
  name = "CreateCalendars1697017841936";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "calendars" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), "text" character varying NOT NULL, "color" character varying NOT NULL, "active" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_90dc0330e8ec9028e23c290dee8" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "calendars"`);
  }
}
