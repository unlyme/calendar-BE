import {MigrationInterface, QueryRunner} from "typeorm";

export class ApplyTimezoneToEvents1701184205413 implements MigrationInterface {
    name = 'ApplyTimezoneToEvents1701184205413'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "start_date"`);
        await queryRunner.query(`ALTER TABLE "events" ADD "start_date" TIMESTAMP WITH TIME ZONE NOT NULL`);
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "end_date"`);
        await queryRunner.query(`ALTER TABLE "events" ADD "end_date" TIMESTAMP WITH TIME ZONE NOT NULL`);
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "series_end_date"`);
        await queryRunner.query(`ALTER TABLE "events" ADD "series_end_date" TIMESTAMP WITH TIME ZONE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "series_end_date"`);
        await queryRunner.query(`ALTER TABLE "events" ADD "series_end_date" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "end_date"`);
        await queryRunner.query(`ALTER TABLE "events" ADD "end_date" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "start_date"`);
        await queryRunner.query(`ALTER TABLE "events" ADD "start_date" TIMESTAMP NOT NULL`);
    }

}
