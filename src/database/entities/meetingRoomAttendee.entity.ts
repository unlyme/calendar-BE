import { Entity, JoinColumn, Column, ManyToOne } from "typeorm";
import BaseEntity from "./base.entity";
import { MeetingRoom } from "./meetingRoom.entity";
import { User } from "./user.entity";

@Entity({
  name: "meeting_room_attendees",
})
export class MeetingRoomAttendee extends BaseEntity {
  @ManyToOne(() => MeetingRoom, (meetingRoom) => meetingRoom.id)
  @JoinColumn({ name: "meeting_room_id" })
  public meetingRoom: MeetingRoom;

  @Column({ name: "meeting_room_id" })
  meetingRoomId: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "attendee_id" })
  public attendee: User;

  @Column({ name: "attendee_id" })
  attendeeId: number;
}
