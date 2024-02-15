import {MigrationInterface, QueryRunner} from "typeorm";

export class AddAttendeesRelation1707312227065 implements MigrationInterface {
    name = 'AddAttendeesRelation1707312227065'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "meeting_room_attendees" ("attendee_id" integer NOT NULL, "meeting_room_id" integer NOT NULL, CONSTRAINT "PK_006eb42f954bbdca1efbf907fbb" PRIMARY KEY ("attendee_id", "meeting_room_id"))`);
        await queryRunner.query(`ALTER TABLE "meeting_room_attendees" ADD CONSTRAINT "FK_e64b03aabe84f029874f68d81b8" FOREIGN KEY ("attendee_id") REFERENCES "meeting_rooms"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "meeting_room_attendees" ADD CONSTRAINT "FK_c90aec4415d5dee4e4b20e7f7a3" FOREIGN KEY ("meeting_room_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meeting_room_attendees" DROP CONSTRAINT "FK_c90aec4415d5dee4e4b20e7f7a3"`);
        await queryRunner.query(`ALTER TABLE "meeting_room_attendees" DROP CONSTRAINT "FK_e64b03aabe84f029874f68d81b8"`);
        await queryRunner.query(`DROP TABLE "meeting_room_attendees"`);
    }

}
