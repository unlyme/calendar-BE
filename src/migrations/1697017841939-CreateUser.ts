import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsers1697017841939 implements MigrationInterface {
  name = "CreateUsers1697017841939";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), "email" character varying NOT NULL, "name" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
