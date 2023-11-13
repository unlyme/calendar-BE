import {MigrationInterface, QueryRunner} from "typeorm";

export class AddStatusToProjectServiceUnits1699532829482 implements MigrationInterface {
    name = 'AddStatusToProjectServiceUnits1699532829482'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project_service_units" ADD "status" character varying NOT NULL DEFAULT 'ACTIVE'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project_service_units" DROP COLUMN "status"`);
    }

}
