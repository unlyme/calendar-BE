import {MigrationInterface, QueryRunner} from "typeorm";

export class Unit1695674345177 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      const initialUnits = [
        {
          "_id":"1",
          "value":"Sports"
        },
        {
          "_id":"2",
          "value":"Social activities"
        },
        {
          "_id":"3",
          "value":"Celebrations"
        }
      ];
      
      await queryRunner.query(`INSERT INTO units (value) VALUES ($1)`, initialUnits.map((unit) => [unit.value]));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
