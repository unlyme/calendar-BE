import {MigrationInterface, QueryRunner} from "typeorm";

export class AddEventToMeetingRooms1710119200131 implements MigrationInterface {
    name = 'AddEventToMeetingRooms1710119200131'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meeting_rooms" ADD "event_id" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meeting_rooms" DROP COLUMN "event_id"`);
    }

}
