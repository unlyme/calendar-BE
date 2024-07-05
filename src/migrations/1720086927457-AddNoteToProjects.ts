import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNoteToProjects1720086927457 implements MigrationInterface {
  name = "AddNoteToProjects1720086927457";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "notes" ADD "project_id" integer NOT NULL`
    );
    await queryRunner.query(`ALTER TABLE "notes" ADD "projectId" integer`);
    await queryRunner.query(
      `ALTER TABLE "notes" ADD CONSTRAINT "FK_abf7aa9bc3c992c60498f4a5448" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "notes" DROP CONSTRAINT "FK_abf7aa9bc3c992c60498f4a5448"`
    );
    await queryRunner.query(`ALTER TABLE "notes" DROP COLUMN "projectId"`);
    await queryRunner.query(`ALTER TABLE "notes" DROP COLUMN "project_id"`);
  }
}
