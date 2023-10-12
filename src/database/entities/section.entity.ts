import { Column, Entity } from 'typeorm';
import BaseEntity from './base.entity';

@Entity({
  name: 'sections'
})
export class Section extends BaseEntity {
  @Column()
  public text: string;
}

export default Section;
