import { getConnection } from "typeorm";
import { StaffRepository } from "../repository/staff.repository";
import { Staff } from "../database/entities/staff.entity";
import { signJwt } from "../utils/jwt";
require('dotenv').config();

export class StaffService {
  private staffRepository: StaffRepository;

  constructor() {
    this.staffRepository = getConnection(process.env.DB_NAME).getCustomRepository(StaffRepository);
  }

  public index = async () => {
    return await this.staffRepository.find({
      order: {
        id: 'ASC'
      }
    })
  }

  public create = async (staff: Partial<Staff>) => {
    return await this.staffRepository.save(this.staffRepository.create(staff))
  }

  public update =  async(id: number, staff: Partial<Staff>) => {
    const updateResult = await this.staffRepository.update(id, staff);
    if (updateResult) {
      const updatedStaff = await this.findStaffById(id);
      return updatedStaff;
    }
    return undefined;
  }

  public delete = async (id: number) => {
    return await this.staffRepository.delete(id);
  }

  public findStaffById = async (id: number) => {
    return await this.staffRepository.findOne({ id });
  }

  public findStaffByEmail = async (email: string) => {
    return await this.staffRepository.findOne({ email });
  }

  public signTokens = async (user: Staff) => {
    const access_token = signJwt({ sub: user.id, role: 'admin' }, 'JWT_ACCESS_TOKEN_PRIVATE_KEY', {
      expiresIn: `${parseInt(process.env.ACCESS_TOKEN_EXPIRES_IN ?? '1')}d`,
    });

    const refresh_token = signJwt({ sub: user.id, role: 'admin' }, 'JWT_REFRESH_TOKEN_PRIVATE_KEY', {
      expiresIn: `${parseInt(process.env.REFRESH_TOKEN_EXPIRES_IN ?? '30')}d`,
    });

    return { access_token, refresh_token, login: user.login };
  }
}
