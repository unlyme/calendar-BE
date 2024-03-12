import {MigrationInterface, QueryRunner} from "typeorm";

export class AddIsArchivedToMeetingRooms1710120714712 implements MigrationInterface {
    name = 'AddIsArchivedToMeetingRooms1710120714712'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meeting_rooms" ADD "is_archived" boolean DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meeting_rooms" DROP COLUMN "is_archived"`);
    }

}
