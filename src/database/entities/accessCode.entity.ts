import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import BaseEntity from "./base.entity";
import { User } from "./user.entity";

@Entity({
  name: "access_codes",
})
export class AccessCode extends BaseEntity {
  @Column()
  public code: string;

  @OneToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  public user: User;

  @Column({ name: 'user_id' })
  public userId: number;
}

export default AccessCode;
