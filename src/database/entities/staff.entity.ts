import {
  Entity,
  Column,
  BeforeInsert,
} from 'typeorm';
import bcrypt from 'bcryptjs';
import BaseEntity from './base.entity';

@Entity({
  name: 'staffs'
})
export class Staff extends BaseEntity {
  @Column({ unique: true })
  email!: string;

  @Column()
  login!: string;

  @Column({ name: 'first_name' })
  firstName!: string;

  @Column({ name: 'last_name' })
  lastName!: string;

  @Column({ select: false })
  password!: string;

  @Column({ name: 'is_admin_privileges', type: 'boolean', default: false })
  isAdminPrivileges: boolean = false;

  @Column({
    type: 'jsonb',
  })
  public contacts: string[];

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
