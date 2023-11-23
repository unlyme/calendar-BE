import {MigrationInterface, QueryRunner} from "typeorm";

export class AddProjectToCalendar1700646783673 implements MigrationInterface {
    name = 'AddProjectToCalendar1700646783673'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "calendars" ADD "project_id" integer`);
        await queryRunner.query(`ALTER TABLE "calendars" ADD CONSTRAINT "FK_d0eaafc1f83589d174a75777977" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "calendars" DROP CONSTRAINT "FK_d0eaafc1f83589d174a75777977"`);
        await queryRunner.query(`ALTER TABLE "calendars" DROP COLUMN "project_id"`);
    }

}
