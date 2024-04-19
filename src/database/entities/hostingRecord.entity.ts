import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import BaseEntity from "./base.entity";
import { Project } from "./project.entity";

@Entity({
  name: 'hosting_records'
})
export class HostingRecord extends BaseEntity {
  @Column({ name: 'cpanel_username', unique: true })
  cpanelUsername: string;

  @OneToOne(() => Project, { nullable: true })
  @JoinColumn({ name: 'project_id' })
  public project: Project;

  @Column({ name: 'project_id' })
  public projectId: number;
}
