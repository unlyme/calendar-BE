import { Column, Entity } from "typeorm";
import { CALENDAR_TEXT } from "../enums/calendar.enum";
import BaseEntity from "./base.entity";

@Entity()
export class Calendar extends BaseEntity {
  @Column({enum: CALENDAR_TEXT})
  public text: CALENDAR_TEXT;

  @Column()
  public color: string;

  @Column({ default: true })
  public active: boolean;
}

export default Calendar;
