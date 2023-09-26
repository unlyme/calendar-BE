import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CALENDAR_UNIT } from "../enums/calendar.enum";

@Entity()
export class Unit {
  
  @PrimaryGeneratedColumn()
  public id: number;
  
  @Column({ enum: CALENDAR_UNIT })
  public value: CALENDAR_UNIT;
}

export default Unit;
