import {MigrationInterface, QueryRunner} from "typeorm";

export class AddServicesToProjectUser1697711016280 implements MigrationInterface {
    name = 'AddServicesToProjectUser1697711016280'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "project_user_services" ("projectUsersId" integer NOT NULL, "servicesId" integer NOT NULL, CONSTRAINT "PK_718d04ea6be0b32c52aeb540cbf" PRIMARY KEY ("projectUsersId", "servicesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_24cb3a01ddc2f7b28e404ac5a5" ON "project_user_services" ("projectUsersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5344003000f0274bfc48dde183" ON "project_user_services" ("servicesId") `);
        await queryRunner.query(`ALTER TABLE "project_user_services" ADD CONSTRAINT "FK_24cb3a01ddc2f7b28e404ac5a54" FOREIGN KEY ("projectUsersId") REFERENCES "project_users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_user_services" ADD CONSTRAINT "FK_5344003000f0274bfc48dde1831" FOREIGN KEY ("servicesId") REFERENCES "services"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project_user_services" DROP CONSTRAINT "FK_5344003000f0274bfc48dde1831"`);
        await queryRunner.query(`ALTER TABLE "project_user_services" DROP CONSTRAINT "FK_24cb3a01ddc2f7b28e404ac5a54"`);
        await queryRunner.query(`DROP INDEX "IDX_5344003000f0274bfc48dde183"`);
        await queryRunner.query(`DROP INDEX "IDX_24cb3a01ddc2f7b28e404ac5a5"`);
        await queryRunner.query(`DROP TABLE "project_user_services"`);
    }
}
