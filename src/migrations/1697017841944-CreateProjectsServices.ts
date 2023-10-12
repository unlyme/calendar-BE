import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProjectsServices1697017841944 implements MigrationInterface {
  name = "CreateProjectsServices1697017841944";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "projects_services" ("projectsId" integer NOT NULL, "servicesId" integer NOT NULL, CONSTRAINT "PK_63de0061ebe1ecff0b8eb55e383" PRIMARY KEY ("projectsId", "servicesId"))`);
    await queryRunner.query(`CREATE INDEX "IDX_7a151787d605b002e190954f80" ON "projects_services" ("projectsId") `);
    await queryRunner.query(`CREATE INDEX "IDX_d3368353e6774cf3e5ccf81ef4" ON "projects_services" ("servicesId") `);
    await queryRunner.query(`ALTER TABLE "projects_services" ADD CONSTRAINT "FK_7a151787d605b002e190954f805" FOREIGN KEY ("projectsId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "projects_services" ADD CONSTRAINT "FK_d3368353e6774cf3e5ccf81ef4b" FOREIGN KEY ("servicesId") REFERENCES "services"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
}

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "projects_services" DROP CONSTRAINT "FK_d3368353e6774cf3e5ccf81ef4b"`);
    await queryRunner.query(`ALTER TABLE "projects_services" DROP CONSTRAINT "FK_7a151787d605b002e190954f805"`);
    await queryRunner.query(`DROP INDEX "IDX_d3368353e6774cf3e5ccf81ef4"`);
    await queryRunner.query(`DROP INDEX "IDX_7a151787d605b002e190954f80"`);
    await queryRunner.query(`DROP TABLE "projects_services"`);
  }
}
