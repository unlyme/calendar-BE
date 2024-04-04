import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import BaseEntity from "./base.entity";
import { User } from "./user.entity";

@Entity({
  name: "notifications",
})
export class Notification extends BaseEntity {
  @Column()
  public category: string;

  @Column()
  public title: string;

  @Column()
  public message: string;

  @Column({ name: 'translation_key' })
  public translationKey: string;

  @ManyToOne(() => User, (user) => user.notifications)
  @JoinColumn({ name: 'user_id' })
  public user: User;

  @Column({ name: 'user_id' })
  public userId: number;
}

export default Notification;
