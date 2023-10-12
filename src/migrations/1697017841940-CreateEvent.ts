import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEvents1697017841940 implements MigrationInterface {
  name = "CreateEvents1697017841940";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "events" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), "start_date" TIMESTAMP NOT NULL, "end_date" TIMESTAMP NOT NULL, "series_end_date" TIMESTAMP, "all_day" boolean NOT NULL DEFAULT false, "text" character varying NOT NULL, "recurring" character varying, "details" character varying NOT NULL, "color" character varying, "origin_id" integer, "calendarId" integer, "unitId" integer, "sectionId" integer, "userId" integer, CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY ("id"))`);
    await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_d34b052f17ba7e1af21ba110bb2" FOREIGN KEY ("calendarId") REFERENCES "calendars"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_e8e911149dae4643db995699c4a" FOREIGN KEY ("unitId") REFERENCES "units"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_3f7ce9410c0446aaedd000d1d73" FOREIGN KEY ("sectionId") REFERENCES "sections"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_9929fa8516afa13f87b41abb263" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
}

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_9929fa8516afa13f87b41abb263"`);
    await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_3f7ce9410c0446aaedd000d1d73"`);
    await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_e8e911149dae4643db995699c4a"`);
    await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_d34b052f17ba7e1af21ba110bb2"`);
    await queryRunner.query(`DROP TABLE "events"`);
  }
}
