import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMembersToNote1720092212713 implements MigrationInterface {
  name = "AddMembersToNote1720092212713";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "notes" ADD "members" jsonb`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "notes" DROP COLUMN "members"`);
  }
}
