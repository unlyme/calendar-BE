import {MigrationInterface, QueryRunner} from "typeorm";

export class AddStatusToStaffs1698311868113 implements MigrationInterface {
    name = 'AddStatusToStaffs1698311868113'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "staffs" ADD "status" character varying NOT NULL DEFAULT 'ACTIVE'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "staffs" DROP COLUMN "status"`);
    }

}
