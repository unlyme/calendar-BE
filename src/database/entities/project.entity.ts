import {
  Entity,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import BaseEntity from './base.entity';
import { User } from './user.entity';
import { PROJECT_STATUS } from '../enums/project.enum';
import { Service } from './service.entity';

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
  @JoinTable({ name: 'project_users' })
  users: User[]
}
