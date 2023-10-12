import {
  Entity,
  Column,
} from 'typeorm';
import BaseEntity from './base.entity';

@Entity({
  name: 'services'
})
export class Service extends BaseEntity {
  @Column()
  name!: string;
}
