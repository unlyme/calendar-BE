import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateProjectUser1697466790351 implements MigrationInterface {
    name = 'CreateProjectUser1697466790351'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "project_users" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), "user_id" integer, "project_id" integer, CONSTRAINT "PK_fe574d521dbce2249af4ee6cbe2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_076af26ee5a7bbcce3f77bfddf" ON "project_users" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_3a53b25fef9b1ac81501a2816a" ON "project_users" ("project_id") `);
        await queryRunner.query(`ALTER TABLE "project_users" ADD CONSTRAINT "FK_076af26ee5a7bbcce3f77bfddfb" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_users" ADD CONSTRAINT "FK_3a53b25fef9b1ac81501a2816a5" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project_users" DROP CONSTRAINT "FK_3a53b25fef9b1ac81501a2816a5"`);
        await queryRunner.query(`ALTER TABLE "project_users" DROP CONSTRAINT "FK_076af26ee5a7bbcce3f77bfddfb"`);
        await queryRunner.query(`DROP INDEX "IDX_3a53b25fef9b1ac81501a2816a"`);
        await queryRunner.query(`DROP INDEX "IDX_076af26ee5a7bbcce3f77bfddf"`);
        await queryRunner.query(`DROP TABLE "project_users"`);
    }

}
