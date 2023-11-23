import {MigrationInterface, QueryRunner} from "typeorm";

export class AddEventToProject1700645094435 implements MigrationInterface {
    name = 'AddEventToProject1700645094435'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" ADD "projectId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_a5fce1673d6b50efc8128ea7ae6" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_a5fce1673d6b50efc8128ea7ae6"`);
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "projectId"`);
    }

}
