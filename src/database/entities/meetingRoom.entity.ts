import { BeforeInsert, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import BaseEntity from "./base.entity";
import { User } from "./user.entity";
import { Project } from "./project.entity";
import { Exclude, instanceToPlain } from "class-transformer";
import bcrypt from "bcryptjs";

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
  @Exclude()
  password: string;

  @ManyToOne(() => User, (user) => user.notes)
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

  @ManyToMany(() => User, (attendee) => attendee.meetingRooms)
  @JoinTable({
    name: 'meeting_room_attendees',
    joinColumn: {
      name: "attendee_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "meeting_room_id",
      referencedColumnName: "id",
    },
  })
  attendees: User[];

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 12);
    }
  }

  static async comparePasswords(
    candidatePassword: string,
    hashedPassword: string
  ) {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  }

  toJSON() {
    return instanceToPlain(this);
  }
}
