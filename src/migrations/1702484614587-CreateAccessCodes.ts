import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateAccessCodes1702484614587 implements MigrationInterface {
    name = 'CreateAccessCodes1702484614587'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "access_codes" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "code" character varying NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "REL_a9f92f8de1164842c4c55eb08d" UNIQUE ("user_id"), CONSTRAINT "PK_702e128569c0cdfeb9cea561cdb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "access_codes" ADD CONSTRAINT "FK_a9f92f8de1164842c4c55eb08d8" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "access_codes" DROP CONSTRAINT "FK_a9f92f8de1164842c4c55eb08d8"`);
        await queryRunner.query(`DROP TABLE "access_codes"`);
    }
}
