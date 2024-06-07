import {MigrationInterface, QueryRunner} from "typeorm";

export class AddProjectToTask1717676277322 implements MigrationInterface {
    name = 'AddProjectToTask1717676277322'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" ADD "project_id" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "project_id"`);
    }

}
