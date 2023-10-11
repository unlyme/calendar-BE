import {Entity, Column, OneToMany, BeforeInsert} from "typeorm";
import bcrypt from 'bcryptjs';
import Event from "./event.entity";
import BaseEntity from "./base.entity";

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true })
  email!: string;

  @Column()
  name!: string;

  @Column()
  password!: string;

  @OneToMany(() => Event, (post) => post.user)
  events: Event[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12);
  }

  static async comparePasswords(
    candidatePassword: string,
    hashedPassword: string
  ) {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  }
}
