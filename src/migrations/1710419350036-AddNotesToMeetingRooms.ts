import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNotesToMeetingRooms1710419350036 implements MigrationInterface {
  name = "AddNotesToMeetingRooms1710419350036";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "meeting_rooms" ADD "notes" jsonb`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "meeting_rooms" DROP COLUMN "notes"`);
  }
}
