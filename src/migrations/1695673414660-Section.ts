import {MigrationInterface, QueryRunner} from "typeorm";

export class Section1695673414660 implements MigrationInterface {
    name = 'Section1695673414660'
    public async up(queryRunner: QueryRunner): Promise<void> {
      const initialSections = [
        {
          "_id": "1",
          "text": "Room 1"
        },
        {
          "_id": "2",
          "text": "Room 2"
        },
        {
          "_id": "3",
          "text": "Room 3"
        },
        {
          "_id": "4",
          "text": "Room 4"
        },
        {
          "_id": "5",
          "text": "Room 5"
        }
      ];
      
      await queryRunner.query(`INSERT INTO sections (text) VALUES ($1)`, initialSections.map((section) => [section.text]));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
