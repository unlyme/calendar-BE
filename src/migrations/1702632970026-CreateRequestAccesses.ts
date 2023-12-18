import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateRequestAccesses1702632970026 implements MigrationInterface {
    name = 'CreateRequestAccesses1702632970026'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "request_accesses" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), "email" character varying NOT NULL, CONSTRAINT "PK_237b8acb67523c58e9e9ed1eab8" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "request_accesses"`);
    }

}
