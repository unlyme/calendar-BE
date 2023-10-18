import { Entity, ManyToOne, JoinColumn, Column } from "typeorm";
import { User } from "./user.entity";
import { Project } from "./project.entity";
import BaseEntity from "./base.entity";

@Entity({
  name: 'project_users'
})
export class ProjectUser extends BaseEntity {
  @ManyToOne(
    () => User,
    user => user.projects,
    {onDelete: 'NO ACTION', onUpdate: 'NO ACTION'}
  )
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  users: User[];

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(
    () => Project,
    project => project.users,
    {onDelete: 'NO ACTION', onUpdate: 'NO ACTION'}
  )
  @JoinColumn([{ name: 'project_id', referencedColumnName: 'id' }])
  projects: Project[];

  @Column({ name: 'project_id' })
  projectId: number;
}
