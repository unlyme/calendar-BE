import {
  Entity,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Service } from './service.entity';
import BaseEntity from './base.entity';
import { User } from './user.entity';
import { PROJECT_STATUS } from '../enums/project.enum';

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

  @ManyToMany(() => Service)
  @JoinTable({ name: 'projects_services' })
  projectServices: Service[]

  @ManyToMany(() => User, (user) => user.projects)
  @JoinTable({ name: 'project_users' })
  users: User[]
}
