import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateMeetingRoom1706797141894 implements MigrationInterface {
    name = 'CreateMeetingRoom1706797141894'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "meeting_rooms" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), "room_name" character varying NOT NULL, "room_uid" character varying NOT NULL, "password" character varying, "user_id" integer NOT NULL, "project_id" integer NOT NULL, "start_at" TIMESTAMP WITH TIME ZONE, "end_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_1e6747496adb820e5eab5f9a272" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "meeting_rooms" ADD CONSTRAINT "FK_887ee593fa13a3bb7672f4291a1" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "meeting_rooms" ADD CONSTRAINT "FK_3db5dbfd68823a6340f0fbf1acd" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meeting_rooms" DROP CONSTRAINT "FK_3db5dbfd68823a6340f0fbf1acd"`);
        await queryRunner.query(`ALTER TABLE "meeting_rooms" DROP CONSTRAINT "FK_887ee593fa13a3bb7672f4291a1"`);
        await queryRunner.query(`DROP TABLE "meeting_rooms"`);
    }

}
