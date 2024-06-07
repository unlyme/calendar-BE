import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import BaseEntity from "./base.entity";
import { Project } from "./project.entity";

@Entity({
  name: "tasks",
})
export class Task extends BaseEntity {
  @Column({
    type: 'jsonb',
  })
  public task: string;

  @OneToOne(() => Project, (project) => project.task)
  public project: Project;

  @Column({ name: 'project_id' })
  public projectId: number;
}

export default Task;
