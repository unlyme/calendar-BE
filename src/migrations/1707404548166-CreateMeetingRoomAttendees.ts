import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateMeetingRoomAttendees1707404548166 implements MigrationInterface {
    name = 'CreateMeetingRoomAttendees1707404548166'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "meeting_room_attendees" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), "meeting_room_id" integer NOT NULL, "attendee_id" integer NOT NULL, CONSTRAINT "PK_060c6dae036cfa01c161d68e7d7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c90aec4415d5dee4e4b20e7f7a" ON "meeting_room_attendees" ("meeting_room_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_e64b03aabe84f029874f68d81b" ON "meeting_room_attendees" ("attendee_id") `);
        await queryRunner.query(`ALTER TABLE "meeting_room_attendees" ADD CONSTRAINT "FK_c90aec4415d5dee4e4b20e7f7a3" FOREIGN KEY ("meeting_room_id") REFERENCES "meeting_rooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "meeting_room_attendees" ADD CONSTRAINT "FK_e64b03aabe84f029874f68d81b8" FOREIGN KEY ("attendee_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meeting_room_attendees" DROP CONSTRAINT "FK_e64b03aabe84f029874f68d81b8"`);
        await queryRunner.query(`ALTER TABLE "meeting_room_attendees" DROP CONSTRAINT "FK_c90aec4415d5dee4e4b20e7f7a3"`);
        await queryRunner.query(`ALTER TABLE "meeting_room_attendees" DROP CONSTRAINT "PK_060c6dae036cfa01c161d68e7d7"`);
        await queryRunner.query(`DROP TABLE "meeting_room_attendees"`);
    }

}
