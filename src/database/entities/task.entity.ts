import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import BaseEntity from "./base.entity";
import { User } from "./user.entity";

@Entity({
  name: "tasks",
})
export class Task extends BaseEntity {
  @Column({
    type: 'jsonb',
  })
  public task: string;

  @ManyToOne(() => User, (user) => user.notes)
  @JoinColumn({ name: 'user_id' })
  public user: User;

  @Column({ name: 'user_id' })
  public userId: number;
}

export default Task;
