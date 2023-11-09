import {
  Entity,
  Column,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import BaseEntity from './base.entity';
import { Project } from './project.entity';

@Entity({
  name: 'services'
})
export class Service extends BaseEntity {
  @Column()
  name!: string;

  @ManyToMany(() => Project, project => project.services)
  @JoinTable({
    name: 'project_service_units',
    joinColumn: {
      name: 'service_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'project_id',
      referencedColumnName: 'id'
    }
  })
  projects: Project[]
}
