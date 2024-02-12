import {MigrationInterface, QueryRunner} from "typeorm";

export class AddIsDefaultColumnToCalendar1706606207579 implements MigrationInterface {
    name = 'AddIsDefaultColumnToCalendar1706606207579'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "calendars" ADD "is_default" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "calendars" DROP COLUMN "is_default"`);
    }

}
