import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import BaseEntity from "./base.entity";
import { User } from "./user.entity";
import { Project } from "./project.entity";

@Entity({
  name: "notes",
})
export class Note extends BaseEntity {
  @Column()
  public text: string;

  @ManyToOne(() => User, (user) => user.notes)
  @JoinColumn({ name: 'user_id' })
  public user: User;

  @Column({ name: 'user_id' })
  public userId: number;

  @ManyToOne(() => Project, (project) => project.notes)
  @JoinColumn({ name: 'project_id' })
  public project: Project;

  @Column({ name: 'project_id' })
  public projectId: number;
}

export default Note;
