import {
  Entity,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Service } from './service.entity';
import BaseEntity from './base.entity';

@Entity()
export class Project extends BaseEntity {
  @Column()
  name!: string;

  @Column({ type: 'decimal', default: 0 })
  balance!: number;

  @Column()
  geography!: string;

  @Column({ type: 'boolean', default: true })
  active: boolean = true;

  @ManyToMany(() => Service)
  @JoinTable({ name: 'projects_services' })
  projectServices: Service[]
}