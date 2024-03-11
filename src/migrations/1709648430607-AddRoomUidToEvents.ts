import {MigrationInterface, QueryRunner} from "typeorm";

export class AddRoomUidToEvents1709648430607 implements MigrationInterface {
    name = 'AddRoomUidToEvents1709648430607'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" ADD "room_uid" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "room_uid"`);
    }

}
