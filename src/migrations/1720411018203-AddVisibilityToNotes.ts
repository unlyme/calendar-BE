import { MigrationInterface, QueryRunner } from "typeorm";

export class AddVisibilityToNotes1720411018203 implements MigrationInterface {
  name = "AddVisibilityToNotes1720411018203";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "notes" ADD "visibility" character varying NOT NULL DEFAULT 'ALL'`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "notes" DROP COLUMN "visibility"`);
  }
}
