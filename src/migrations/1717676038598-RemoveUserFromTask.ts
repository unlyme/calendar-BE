import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveUserFromTask1717676038598 implements MigrationInterface {
  name = "RemoveUserFromTask1717676038598";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tasks" DROP CONSTRAINT "FK_db55af84c226af9dce09487b61b"`
    );
    await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "user_id"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tasks" ADD "user_id" integer NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "tasks" ADD CONSTRAINT "FK_db55af84c226af9dce09487b61b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
