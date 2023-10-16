import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeUserIdColumToCalendar1697172032701 implements MigrationInterface {
    name = 'ChangeUserIdColumToCalendar1697172032701'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "calendars" DROP CONSTRAINT "FK_335d9e9af743fe91668b8f0d6fd"`);
        await queryRunner.query(`ALTER TABLE "calendars" RENAME COLUMN "userId" TO "user_id"`);
        await queryRunner.query(`ALTER TABLE "calendars" ADD CONSTRAINT "FK_baf8690eea3928bf4fe59c21414" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "calendars" DROP CONSTRAINT "FK_baf8690eea3928bf4fe59c21414"`);
        await queryRunner.query(`ALTER TABLE "calendars" RENAME COLUMN "user_id" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "calendars" ADD CONSTRAINT "FK_335d9e9af743fe91668b8f0d6fd" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
