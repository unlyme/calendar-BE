import { Entity, ManyToOne, JoinColumn, Column, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Project } from "./project.entity";
import BaseEntity from "./base.entity";
import { Service } from "./service.entity";

@Entity({
  name: 'projects_services'
})
export class ProjectService extends BaseEntity {
  @ManyToOne(
    () => Service,
    (service) => service.projects,
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' }
  )
  @JoinColumn({ name: 'service_id', referencedColumnName: 'id' })
  public services: Service[]

  @Column({ name: 'service_id' })
  serviceId: number;

  @ManyToOne(
    () => Project,
    (project) => project.services,
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' }
  )
  @JoinColumn({ name: 'project_id', referencedColumnName: 'id' })
  public projects: Project[]

  @Column({ name: 'project_id' })
  projectId: number;
}
