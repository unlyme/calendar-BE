import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import BaseEntity from "./base.entity";
import { Project } from "./project.entity";

@Entity({
  name: 'alpha_hosting_records'
})
export class AlphaHostingRecord extends BaseEntity {
  @Column({ name: 'username', unique: true })
  username: string;

  @Column({ name: 'uid', unique: true })
  uid: number;

  @OneToOne(() => Project, { nullable: true })
  @JoinColumn({ name: 'project_id' })
  public project: Project;

  @Column({ name: 'project_id' })
  public projectId: number;
}
