import {MigrationInterface, QueryRunner} from "typeorm";

export class AddMoreColumnsToMeetingRooms1709830950869 implements MigrationInterface {
    name = 'AddMoreColumnsToMeetingRooms1709830950869'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meeting_rooms" ADD "is_enabled_lobby" boolean`);
        await queryRunner.query(`ALTER TABLE "meeting_rooms" ADD "is_enabled_e2ee" boolean`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meeting_rooms" DROP COLUMN "is_enabled_e2ee"`);
        await queryRunner.query(`ALTER TABLE "meeting_rooms" DROP COLUMN "is_enabled_lobby"`);
    }

}
