import {
  Entity,
  Column,
  OneToMany,
  BeforeInsert,
  ManyToMany,
  JoinTable,
  OneToOne,
} from "typeorm";
import bcrypt from "bcryptjs";
import Event from "./event.entity";
import BaseEntity from "./base.entity";
import Calendar from "./calendar.entity";
import Note from "./note.entity";
import Task from "./task.entity";
import { Project } from "./project.entity";
import { instanceToPlain, Exclude } from "class-transformer";
import { USER_STATUS } from "../enums/user.enum";
import AccessCode from "./accessCode.entity";

@Entity({
  name: "users",
})
export class User extends BaseEntity {
  @Column({ unique: true })
  email!: string;

  @Column({ name: "first_name" })
  firstName!: string;

  @Column({ name: "last_name" })
  lastName!: string;

  @Column({ enum: USER_STATUS, default: USER_STATUS.ACTIVE })
  status: USER_STATUS;

  @Column({
    type: "jsonb",
  })
  public contacts: string[];

  @Column()
  @Exclude()
  password!: string;

  @OneToMany(() => Event, (post) => post.user)
  events: Event[];

  @OneToMany(() => Calendar, (calendar) => calendar.user)
  calendars: Calendar[];

  @OneToMany(() => Note, (note) => note.user)
  notes: Note[];

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];

  @ManyToMany(() => Project, (project) => project.users)
  @JoinTable({
    name: "project_users",
    joinColumn: {
      name: "user_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "project_id",
      referencedColumnName: "id",
    },
  })
  projects: Project[];

  @OneToOne(() => AccessCode, { nullable: true })
  public accessCode: AccessCode;

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

  toJSON() {
    return instanceToPlain(this);
  }
}
