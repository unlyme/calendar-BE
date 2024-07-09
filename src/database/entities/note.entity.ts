import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import BaseEntity from "./base.entity";
import { User } from "./user.entity";
import { Project } from "./project.entity";
import bcrypt from "bcryptjs";
import { instanceToPlain, Exclude } from "class-transformer";

@Entity({
  name: "notes",
})
export class Note extends BaseEntity {
  @ManyToOne(() => User, (user) => user.notes)
  @JoinColumn({ name: "user_id" })
  public user: User;

  @Column({ name: "user_id" })
  public userId: number;

  @ManyToOne(() => Project, (project) => project.notes)
  @JoinColumn({ name: "project_id" })
  public project: Project;

  @Column({ name: "project_id" })
  public projectId: number;

  @Column({
    nullable: true,
  })
  public title: string;

  @Column({
    default: false,
  })
  public pinned: boolean;

  @Column({
    default: false,
  })
  public locked: boolean;

  @Column({
    nullable: true,
  })
  @Exclude()
  public password: string;

  @Column({
    type: "jsonb",
  })
  public message: any;

  @Column({
    type: "jsonb",
    default: [],
    nullable: true
  })
  public members: any;

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

export default Note;
