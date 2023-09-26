import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Section {
  
  @PrimaryGeneratedColumn()
  public id: number;
  
  @Column()
  public text: string;
}

export default Section;
