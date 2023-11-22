import {MigrationInterface, QueryRunner} from "typeorm";

export class AddStatusToProjectUser1700556286697 implements MigrationInterface {
    name = 'AddStatusToProjectUser1700556286697'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project_users" ADD "status" character varying NOT NULL DEFAULT 'ACTIVE'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project_users" DROP COLUMN "status"`);
    }
}
