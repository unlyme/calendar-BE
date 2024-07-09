import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMoreFieldsToNotes1720090839922 implements MigrationInterface {
  name = "AddMoreFieldsToNotes1720090839922";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "notes" DROP COLUMN "text"`);
    await queryRunner.query(
      `ALTER TABLE "notes" ADD "title" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "notes" ADD "pinned" boolean NOT NULL DEFAULT false`
    );
    await queryRunner.query(
      `ALTER TABLE "notes" ADD "locked" boolean NOT NULL DEFAULT false`
    );
    await queryRunner.query(
      `ALTER TABLE "notes" ADD "password" character varying`
    );
    await queryRunner.query(`ALTER TABLE "notes" ADD "message" jsonb NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "notes" ADD CONSTRAINT "FK_64567ba716240b262710cfbfb0d" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "notes" DROP CONSTRAINT "FK_64567ba716240b262710cfbfb0d"`
    );
    await queryRunner.query(`ALTER TABLE "notes" DROP COLUMN "message"`);
    await queryRunner.query(`ALTER TABLE "notes" DROP COLUMN "password"`);
    await queryRunner.query(`ALTER TABLE "notes" DROP COLUMN "locked"`);
    await queryRunner.query(`ALTER TABLE "notes" DROP COLUMN "pinned"`);
    await queryRunner.query(`ALTER TABLE "notes" DROP COLUMN "title"`);
    await queryRunner.query(
      `ALTER TABLE "notes" ADD "text" character varying NOT NULL`
    );
  }
}
