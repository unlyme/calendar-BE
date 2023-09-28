import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import Calendar from "./calendar.entity";
import Unit from "./unit.entity";
import Section from "./section.entity";
import {User} from "./user.entity";

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  public id: number;
  
  @Column()
  public start_date: string;
  
  @Column()
  public end_date: string;
  
  @Column({ nullable: true })
  public series_end_date: string;
  
  @Column({ nullable: true })
  public all_day: boolean;
  
  @Column()
  public text: string;
  
  @Column({ nullable: true })
  public recurring: string;
  
  @Column()
  public details: string;
  
  @Column({ nullable: true })
  public color: string;
  
  @Column({ nullable: true })
  public origin_id: number;
  
  @ManyToOne(() => Calendar, (calendar) => calendar.id)
  public calendar: Calendar;
  
  @ManyToOne(() => Unit, (unit) => unit.id)
  public unit: Unit;
  
  @ManyToOne(() => Section, (section) => section.id)
  public section: Section;
  
  @ManyToOne(() => User, (user) => user.events)
  @JoinColumn()
  public user: User;
}

export default Event;
