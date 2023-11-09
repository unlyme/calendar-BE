import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateColumnsToProjectService1699284567569 implements MigrationInterface {
    name = 'UpdateColumnsToProjectService1699284567569'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects_services" DROP CONSTRAINT "FK_d3368353e6774cf3e5ccf81ef4b"`);
        await queryRunner.query(`ALTER TABLE "projects_services" DROP CONSTRAINT "FK_7a151787d605b002e190954f805"`);
        await queryRunner.query(`ALTER TABLE "projects_services" DROP CONSTRAINT "PK_63de0061ebe1ecff0b8eb55e383"`);
        await queryRunner.query(`ALTER TABLE "projects_services" ADD CONSTRAINT "PK_d3368353e6774cf3e5ccf81ef4b" PRIMARY KEY ("servicesId")`);
        await queryRunner.query(`ALTER TABLE "projects_services" DROP COLUMN "projectsId"`);
        await queryRunner.query(`ALTER TABLE "projects_services" DROP CONSTRAINT "PK_d3368353e6774cf3e5ccf81ef4b"`);
        await queryRunner.query(`ALTER TABLE "projects_services" DROP COLUMN "servicesId"`);
        await queryRunner.query(`ALTER TABLE "projects_services" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "projects_services" ADD CONSTRAINT "PK_ef20113d42c81c587fccb02e399" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "projects_services" ADD "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE "projects_services" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE "projects_services" ADD "service_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "projects_services" ADD "project_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "projects_services" ADD "servicesId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "projects_services" DROP CONSTRAINT "PK_ef20113d42c81c587fccb02e399"`);
        await queryRunner.query(`ALTER TABLE "projects_services" ADD CONSTRAINT "PK_3939b83d647af3f21a1a30fae0f" PRIMARY KEY ("id", "servicesId")`);
        await queryRunner.query(`ALTER TABLE "projects_services" ADD "projectsId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "projects_services" DROP CONSTRAINT "PK_3939b83d647af3f21a1a30fae0f"`);
        await queryRunner.query(`ALTER TABLE "projects_services" ADD CONSTRAINT "PK_6519a941ac143dbf5e4409e92e9" PRIMARY KEY ("id", "servicesId", "projectsId")`);
        await queryRunner.query(`ALTER TABLE "projects_services" DROP CONSTRAINT "PK_6519a941ac143dbf5e4409e92e9"`);
        await queryRunner.query(`ALTER TABLE "projects_services" ADD CONSTRAINT "PK_63de0061ebe1ecff0b8eb55e383" PRIMARY KEY ("servicesId", "projectsId")`);
        await queryRunner.query(`ALTER TABLE "projects_services" ADD CONSTRAINT "PK_526acb113ace528b6912bd3074a" PRIMARY KEY ("project_id", "service_id")`);
        await queryRunner.query(`ALTER TABLE "projects_services" DROP CONSTRAINT "PK_e56b5c496bd8fcf86a94e2272aa"`);
        await queryRunner.query(`ALTER TABLE "projects_services" ADD CONSTRAINT "PK_733e19e14870f22084b5e31cbdd" PRIMARY KEY ("id", "project_id", "servicesId", "projectsId")`);
        await queryRunner.query(`ALTER TABLE "projects_services" DROP CONSTRAINT "PK_733e19e14870f22084b5e31cbdd"`);
        await queryRunner.query(`ALTER TABLE "projects_services" ADD CONSTRAINT "PK_6519a941ac143dbf5e4409e92e9" PRIMARY KEY ("id", "servicesId", "projectsId")`);
        await queryRunner.query(`ALTER TABLE "projects_services" DROP CONSTRAINT "PK_6519a941ac143dbf5e4409e92e9"`);
        await queryRunner.query(`ALTER TABLE "projects_services" ADD CONSTRAINT "PK_733e19e14870f22084b5e31cbdd" PRIMARY KEY ("id", "servicesId", "projectsId", "project_id")`);
        await queryRunner.query(`ALTER TABLE "projects_services" DROP CONSTRAINT "PK_733e19e14870f22084b5e31cbdd"`);
        await queryRunner.query(`ALTER TABLE "projects_services" ADD CONSTRAINT "PK_e56b5c496bd8fcf86a94e2272aa" PRIMARY KEY ("id", "project_id", "servicesId", "projectsId", "service_id")`);
        await queryRunner.query(`CREATE INDEX "IDX_d3368353e6774cf3e5ccf81ef4" ON "projects_services" ("servicesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_7a151787d605b002e190954f80" ON "projects_services" ("projectsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a26ca763c38c4a39acfe90c99e" ON "projects_services" ("project_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_12a44bee391d36c8536f8793ad" ON "projects_services" ("service_id") `);
        await queryRunner.query(`ALTER TABLE "projects_services" ADD CONSTRAINT "FK_12a44bee391d36c8536f8793ad5" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "projects_services" ADD CONSTRAINT "FK_a26ca763c38c4a39acfe90c99e5" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "projects_services" ADD CONSTRAINT "FK_d3368353e6774cf3e5ccf81ef4b" FOREIGN KEY ("servicesId") REFERENCES "services"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "projects_services" ADD CONSTRAINT "FK_7a151787d605b002e190954f805" FOREIGN KEY ("projectsId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects_services" DROP CONSTRAINT "FK_7a151787d605b002e190954f805"`);
        await queryRunner.query(`ALTER TABLE "projects_services" DROP CONSTRAINT "FK_d3368353e6774cf3e5ccf81ef4b"`);
        await queryRunner.query(`ALTER TABLE "projects_services" DROP CONSTRAINT "FK_a26ca763c38c4a39acfe90c99e5"`);
        await queryRunner.query(`ALTER TABLE "projects_services" DROP CONSTRAINT "FK_12a44bee391d36c8536f8793ad5"`);
        await queryRunner.query(`ALTER TABLE "projects_services" DROP CONSTRAINT "PK_e56b5c496bd8fcf86a94e2272aa"`);
        await queryRunner.query(`ALTER TABLE "projects_services" ADD CONSTRAINT "PK_733e19e14870f22084b5e31cbdd" PRIMARY KEY ("id", "project_id", "servicesId", "projectsId")`);
        await queryRunner.query(`ALTER TABLE "projects_services" DROP CONSTRAINT "PK_733e19e14870f22084b5e31cbdd"`);
        await queryRunner.query(`ALTER TABLE "projects_services" ADD CONSTRAINT "PK_6519a941ac143dbf5e4409e92e9" PRIMARY KEY ("id", "servicesId", "projectsId")`);
        await queryRunner.query(`ALTER TABLE "projects_services" DROP CONSTRAINT "PK_6519a941ac143dbf5e4409e92e9"`);
        await queryRunner.query(`ALTER TABLE "projects_services" ADD CONSTRAINT "PK_733e19e14870f22084b5e31cbdd" PRIMARY KEY ("id", "project_id", "servicesId", "projectsId")`);
        await queryRunner.query(`ALTER TABLE "projects_services" DROP CONSTRAINT "PK_733e19e14870f22084b5e31cbdd"`);
        await queryRunner.query(`ALTER TABLE "projects_services" ADD CONSTRAINT "PK_e56b5c496bd8fcf86a94e2272aa" PRIMARY KEY ("id", "service_id", "project_id", "servicesId", "projectsId")`);
        await queryRunner.query(`ALTER TABLE "projects_services" DROP CONSTRAINT "PK_526acb113ace528b6912bd3074a"`);
        await queryRunner.query(`ALTER TABLE "projects_services" ADD CONSTRAINT "PK_6519a941ac143dbf5e4409e92e9" PRIMARY KEY ("id", "servicesId", "projectsId")`);
        await queryRunner.query(`ALTER TABLE "projects_services" DROP CONSTRAINT "PK_63de0061ebe1ecff0b8eb55e383"`);
        await queryRunner.query(`ALTER TABLE "projects_services" ADD CONSTRAINT "PK_6519a941ac143dbf5e4409e92e9" PRIMARY KEY ("id", "servicesId", "projectsId")`);
        await queryRunner.query(`ALTER TABLE "projects_services" DROP CONSTRAINT "PK_6519a941ac143dbf5e4409e92e9"`);
        await queryRunner.query(`ALTER TABLE "projects_services" ADD CONSTRAINT "PK_3939b83d647af3f21a1a30fae0f" PRIMARY KEY ("id", "servicesId")`);
        await queryRunner.query(`ALTER TABLE "projects_services" DROP COLUMN "projectsId"`);
        await queryRunner.query(`ALTER TABLE "projects_services" DROP CONSTRAINT "PK_3939b83d647af3f21a1a30fae0f"`);
        await queryRunner.query(`ALTER TABLE "projects_services" ADD CONSTRAINT "PK_ef20113d42c81c587fccb02e399" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "projects_services" DROP COLUMN "servicesId"`);
        await queryRunner.query(`ALTER TABLE "projects_services" DROP COLUMN "project_id"`);
        await queryRunner.query(`ALTER TABLE "projects_services" DROP COLUMN "service_id"`);
        await queryRunner.query(`ALTER TABLE "projects_services" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "projects_services" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "projects_services" DROP CONSTRAINT "PK_ef20113d42c81c587fccb02e399"`);
        await queryRunner.query(`ALTER TABLE "projects_services" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "projects_services" ADD "servicesId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "projects_services" ADD CONSTRAINT "PK_d3368353e6774cf3e5ccf81ef4b" PRIMARY KEY ("servicesId")`);
        await queryRunner.query(`ALTER TABLE "projects_services" ADD "projectsId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "projects_services" DROP CONSTRAINT "PK_d3368353e6774cf3e5ccf81ef4b"`);
        await queryRunner.query(`ALTER TABLE "projects_services" ADD CONSTRAINT "PK_63de0061ebe1ecff0b8eb55e383" PRIMARY KEY ("projectsId", "servicesId")`);
        await queryRunner.query(`CREATE INDEX "IDX_d3368353e6774cf3e5ccf81ef4" ON "projects_services" ("servicesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_7a151787d605b002e190954f80" ON "projects_services" ("projectsId") `);
        await queryRunner.query(`ALTER TABLE "projects_services" ADD CONSTRAINT "FK_7a151787d605b002e190954f805" FOREIGN KEY ("projectsId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "projects_services" ADD CONSTRAINT "FK_d3368353e6774cf3e5ccf81ef4b" FOREIGN KEY ("servicesId") REFERENCES "services"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
