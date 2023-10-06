import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from "typeorm";
import bcrypt from 'bcryptjs';

@Entity()
export class Staff {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  email!: string;

  @Column()
  login!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  password!: string;

  @Column({ type: 'boolean', default: false })
  isAdminPrivileges: boolean = false;

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
