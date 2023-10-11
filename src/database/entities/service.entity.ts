import {
  Entity,
  Column,
} from 'typeorm';
import BaseEntity from './base.entity';

@Entity()
export class Service extends BaseEntity {
  @Column()
  name!: string;
}
