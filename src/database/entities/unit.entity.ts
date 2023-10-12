import { Column, Entity } from "typeorm";
import { CALENDAR_UNIT } from "../enums/calendar.enum";
import { BaseEntity } from "./base.entity";

@Entity({
  name: 'units'
})
export class Unit extends BaseEntity {
  @Column({ enum: CALENDAR_UNIT })
  public value: CALENDAR_UNIT;
}

export default Unit;
