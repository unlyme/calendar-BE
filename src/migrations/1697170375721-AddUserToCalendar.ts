import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUserToCalendar1697170375721 implements MigrationInterface {
    name = 'AddUserToCalendar1697170375721'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "calendars" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "calendars" ADD CONSTRAINT "FK_335d9e9af743fe91668b8f0d6fd" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "calendars" DROP CONSTRAINT "FK_335d9e9af743fe91668b8f0d6fd"`);
        await queryRunner.query(`ALTER TABLE "calendars" DROP COLUMN "userId"`);
    }
}
