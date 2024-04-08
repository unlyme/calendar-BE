import {MigrationInterface, QueryRunner} from "typeorm";

export class AddBalanceToUsers1712325545098 implements MigrationInterface {
    name = 'AddBalanceToUsers1712325545098'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "balance" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "balance"`);
    }

}
