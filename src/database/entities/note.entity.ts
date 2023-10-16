import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import BaseEntity from "./base.entity";
import { User } from "./user.entity";

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
}

export default Note;
