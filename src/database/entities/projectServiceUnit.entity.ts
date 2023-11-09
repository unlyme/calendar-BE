import { Entity, JoinColumn, Column, ManyToOne } from "typeorm";
import { Project } from "./project.entity";
import BaseEntity from "./base.entity";
import { Service } from "./service.entity";

@Entity({
  name: 'project_service_units'
})
export class ProjectServiceUnit extends BaseEntity {
  @ManyToOne(
    () => Service,
    service => service.id
  )
  @JoinColumn({ name: 'service_id' })
  public service: Service

  @Column({ name: 'service_id' })
  serviceId: number;

  @ManyToOne(
    () => Project,
    project => project.id
  )
  @JoinColumn({ name: 'project_id' })
  public project: Project

  @Column({ name: 'project_id' })
  projectId: number;
}
