import { getConnection } from "typeorm";
import { AdminRepository } from "../repository/admin.repository";
import { Admin } from "../database/entities/admin.entity";
import { signJwt } from "../utils/jwt";
require('dotenv').config();

export class AdminService {
  private adminRepositor: AdminRepository;

  constructor() {
    this.adminRepositor = getConnection(process.env.DB_NAME).getCustomRepository(AdminRepository);
  }

  public index = async () => {
    return await this.adminRepositor.find({
      order: {
        id: 'ASC'
      }
    })
  }

  public findAdminById = async (id: number) => {
    return await this.adminRepositor.findOne({ id });
  }

  public findAdminByEmail = async (email: string) => {
    return await this.adminRepositor.findOne({ email });
  }

  public signTokens = async (user: Admin) => {
    const access_token = signJwt({ sub: user.id, role: 'admin' }, 'JWT_ACCESS_TOKEN_PRIVATE_KEY', {
      expiresIn: `${parseInt(process.env.ACCESS_TOKEN_EXPIRES_IN ?? '15')}m`,
    });

    const refresh_token = signJwt({ sub: user.id, role: 'admin' }, 'JWT_REFRESH_TOKEN_PRIVATE_KEY', {
      expiresIn: `${parseInt(process.env.REFRESH_TOKEN_EXPIRES_IN ?? '60')}m`,
    });

    return { access_token, refresh_token };
  }
}
