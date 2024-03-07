import {MigrationInterface, QueryRunner} from "typeorm";

export class AddFrecencyToMeetingRooms1709306570444 implements MigrationInterface {
    name = 'AddFrecencyToMeetingRooms1709306570444'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meeting_rooms" ADD "frecency" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meeting_rooms" DROP COLUMN "frecency"`);
    }

}
