import {MigrationInterface, QueryRunner} from "typeorm";

export class AddSentToRequestAccesses1702883263646 implements MigrationInterface {
    name = 'AddSentToRequestAccesses1702883263646'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "request_accesses" ADD "sent" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "request_accesses" DROP COLUMN "sent"`);
    }

}
