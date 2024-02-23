import {MigrationInterface, QueryRunner} from "typeorm";

export class AddTimezoneColumnToMeetingRoom1708446526156 implements MigrationInterface {
    name = 'AddTimezoneColumnToMeetingRoom1708446526156'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meeting_rooms" ADD "timezone" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meeting_rooms" DROP COLUMN "timezone"`);
    }

}
