import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import BaseEntity from "./base.entity";
import { User } from "./user.entity";
import { Project } from "./project.entity";

@Entity({
  name: 'meeting_rooms'
})
export class MeetingRoom extends BaseEntity {
  @Column({ name: 'room_name' })
  public roomName: string;

  @Column({ name: 'room_uid' })
  public roomUid: string

  @ManyToOne(() => User, (user) => user.notes)
  @JoinColumn({ name: 'user_id' })
  public user: User;

  @Column({ name: 'user_id' })
  public userId: number;

  @ManyToOne(() => Project, (project) => project.meetingRooms)
  @JoinColumn({ name: 'project_id' })
  public project: Project;

  @Column({ name: 'project_id' })
  public projectId: number;

  @Column({
    name: 'start_at',
    type: "timestamp with time zone",
    nullable: true // null if it is an instant meeting
  })
  public startAt: string;

  @Column({
    name: 'end_at',
    type: "timestamp with time zone",
    nullable: true
  })
  public endAt: string;
}
