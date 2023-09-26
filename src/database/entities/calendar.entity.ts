import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CALENDAR_TEXT } from "../enums/calendar.enum";

@Entity()
export class Calendar {
  
  @PrimaryGeneratedColumn()
  public id: number;
  
  @Column({enum: CALENDAR_TEXT})
  public text: CALENDAR_TEXT;
  
  @Column()
  public color: string;
  
  @Column()
  public active: boolean;
}

export default Calendar;
