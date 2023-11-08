import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateStatusToProject1699011372638 implements MigrationInterface {
    name = 'UpdateStatusToProject1699011372638'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" RENAME COLUMN "active" TO "status"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "projects" ADD "status" character varying NOT NULL DEFAULT 'ACTIVE'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "projects" ADD "status" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "projects" RENAME COLUMN "status" TO "active"`);
    }
}
