import { Entity, Column, OneToMany, BeforeInsert, ManyToMany, JoinTable } from "typeorm";
import bcrypt from "bcryptjs";
import Event from "./event.entity";
import BaseEntity from "./base.entity";
import Calendar from "./calendar.entity";
import Note from "./note.entity";
import Task from "./task.entity";
import { Project } from "./project.entity";

@Entity({
  name: "users",
})
export class User extends BaseEntity {
  @Column({ unique: true })
  email!: string;

  @Column()
  name!: string;

  @Column()
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
    name: 'project_users',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'project_id',
      referencedColumnName: 'id',
    },
  })
  projects: Project[]

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
