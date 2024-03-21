import { BeforeInsert, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import BaseEntity from "./base.entity";
import { User } from "./user.entity";
import { Project } from "./project.entity";
import { Exclude, instanceToPlain } from "class-transformer";
import bcrypt from "bcryptjs";

export enum FRECENCY {
  ONCE = 'ONCE',
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY'
}

@Entity({
  name: "meeting_rooms",
})
export class MeetingRoom extends BaseEntity {
  @Column({ name: "room_name" })
  public roomName: string;

  @Column({ name: "room_uid" })
  public roomUid: string;

  @Column({
    name: "password",
    nullable: true,
  })
  password: string;

  @Column({
    name: 'frecency',
    nullable: true
  })
  frecency: FRECENCY

  @ManyToOne(() => User, (user) => user.meetingRooms)
  @JoinColumn({ name: "user_id" })
  public user: User;

  @Column({ name: "user_id" })
  public userId: number;

  @ManyToOne(() => Project, (project) => project.meetingRooms)
  @JoinColumn({ name: "project_id" })
  public project: Project;

  @Column({ name: "project_id" })
  public projectId: number;

  @Column({
    name: "start_at",
    type: "timestamp with time zone",
    nullable: true, // null if it is an instant meeting
  })
  public startAt: string;

  @Column({
    name: "end_at",
    type: "timestamp with time zone",
    nullable: true,
  })
  public endAt: string;

  @Column({
    name: 'notes',
    type: 'jsonb',
    nullable: true,
  })
  public notes: any[];

  @Column({ name: 'timezone', nullable: true })
  public timezone: string;

  @Column({ name: 'is_enabled_lobby', nullable: true })
  public isEnabledLobby: boolean;

  @Column({ name: 'is_enabled_e2ee', nullable: true })
  public isEnabledE2EE: boolean;

  @Column({ name: 'event_id', nullable: true })
  public eventId: number;

  @Column({ name: 'is_archived', nullable: true, default: false })
  public isArchived: boolean;

  @ManyToMany(() => User, (attendee) => attendee.meetingRooms)
  @JoinTable({
    name: 'meeting_room_attendees',
    joinColumn: {
      name: "meeting_room_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "attendee_id",
      referencedColumnName: "id",
    },
  })
  attendees: User[];

  toJSON() {
    return instanceToPlain(this);
  }
}
