import {
  Entity,
  Column,
  BeforeInsert,
} from 'typeorm';
import bcrypt from 'bcryptjs';
import BaseEntity from './base.entity';
import { Exclude, instanceToPlain } from 'class-transformer';
import { STAFF_STATUS } from '../enums/staff.enum';

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

  @Column()
  @Exclude()
  password!: string;

  @Column({ enum: STAFF_STATUS, default: STAFF_STATUS.ACTIVE })
  status: STAFF_STATUS;

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

  toJSON() {
    return instanceToPlain(this);
  }
}
