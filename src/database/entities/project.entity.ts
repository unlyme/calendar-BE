import {
  Entity,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import BaseEntity from './base.entity';
import { User } from './user.entity';
import { PROJECT_STATUS } from '../enums/project.enum';
import { Service } from './service.entity';
import { Event } from './event.entity';
import Calendar from './calendar.entity';
import { MeetingRoom } from './meetingRoom.entity';

@Entity({
  name: 'projects'
})
export class Project extends BaseEntity {
  @Column()
  name!: string;

  @Column({ type: 'decimal', default: 0 })
  balance!: number;

  @Column()
  geography!: string;

  @Column({ enum: PROJECT_STATUS, default: PROJECT_STATUS.ACTIVE })
  status: PROJECT_STATUS;

  @ManyToMany(() => Service, service => service.projects)
  @JoinTable({
    name: 'project_service_units',
    joinColumn: {
      name: 'project_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'service_id',
      referencedColumnName: 'id'
    }
  })
  services: Service[]

  @ManyToMany(() => User, (user) => user.projects)
  @JoinTable({
    name: 'project_users',
    joinColumn: {
      name: 'project_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  users: User[]

  @OneToMany(() => Event, (event) => event.project)
  events: Event[];

  @OneToMany(() => Calendar, (calendar) => calendar.project)
  calendars: Calendar[];

  @OneToMany(() => MeetingRoom, (meetingRoom) => meetingRoom.user)
  meetingRooms: MeetingRoom[];
}
