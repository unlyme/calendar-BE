import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { CALENDAR_TEXT } from "../enums/calendar.enum";
import BaseEntity from "./base.entity";
import { User } from "./user.entity";
import { Project } from "./project.entity";

@Entity({
  name: "calendars",
})
export class Calendar extends BaseEntity {
  @Column({ enum: CALENDAR_TEXT })
  public text: CALENDAR_TEXT;

  @Column()
  public color: string;

  @Column({ default: true })
  public active: boolean = true;

  @ManyToOne(() => User, (user) => user.calendars, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  public user: User;

  @Column({ name: 'user_id' })
  public userId: number;

  @ManyToOne(() => Project, (project) => project.calendars, { nullable: true })
  @JoinColumn({ name: 'project_id' })
  public project: Project;

  @Column({ name: 'project_id' })
  public projectId: number;
}

export default Calendar;
