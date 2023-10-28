import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateColumnsToUsers1698391548835 implements MigrationInterface {
    name = 'UpdateColumnsToUsers1698391548835'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "first_name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "last_name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "status" character varying NOT NULL DEFAULT 'ACTIVE'`);
        await queryRunner.query(`ALTER TABLE "users" ADD "contacts" jsonb NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "contacts"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "last_name"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "first_name"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "name" character varying NOT NULL`);
    }
}
