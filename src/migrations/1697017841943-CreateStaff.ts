import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateStaffs1697017841943 implements MigrationInterface {
  name = "CreateStaffs1697017841943";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "staffs" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), "email" character varying NOT NULL, "login" character varying NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "password" character varying NOT NULL, "is_admin_privileges" boolean NOT NULL DEFAULT false, "contacts" jsonb NOT NULL, CONSTRAINT "UQ_fc7b6dc314d349acb74a6124fe9" UNIQUE ("email"), CONSTRAINT "PK_f3fec5e06209b46afdf8accf117" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "staffs"`);
  }
}
