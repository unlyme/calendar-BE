import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from "typeorm";
import Calendar from "./calendar.entity";
import Unit from "./unit.entity";
import Section from "./section.entity";
import { User } from "./user.entity";
import BaseEntity from "./base.entity";
import { Project } from "./project.entity";

@Entity({
  name: 'events'
})
export class Event extends BaseEntity {
  @Column({
    name: 'start_date',
    type: "timestamp with time zone"
  })
  public startDate: string;

  @Column({
    name: 'end_date',
    type: "timestamp with time zone"
  })
  public endDate: string;

  @Column({
    name: "series_end_date",
    type: "timestamp with time zone",
    nullable: true
  })
  public seriesEndDate: string;

  @Column({
    name: 'all_day',
    default: false
  })
  public allDay: boolean;

  @Column({
    name: 'room_uid',
    nullable: true
  })
  public roomUid: string;

  @Column()
  public text: string;

  @Column({
    nullable: true
  })
  public recurring: string;

  @Column()
  public details: string;

  @Column({ nullable: true })
  public color: string;

  @Column({ name: 'origin_id', nullable: true })
  public originId: number;

  @ManyToOne(() => Calendar, (calendar) => calendar.id)
  public calendar: Calendar;

  @Column()
  public calendarId: number;

  @ManyToOne(() => Unit, (unit) => unit.id)
  public unit: Unit;

  @ManyToOne(() => Section, (section) => section.id)
  public section: Section;

  @ManyToOne(() => User, (user) => user.events)
  @JoinColumn()
  public user: User;

  @Column()
  public userId: number;

  @ManyToOne(() => Project, (project) => project.events)
  @JoinColumn()
  public project: Project;

  @Column()
  public projectId: number;
}

export default Event;
