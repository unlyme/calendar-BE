import { Between, ILike, Like, getConnection } from "typeorm";
import { User } from "../database/entities/user.entity";
import { UserRepository } from "../repository/user.repository";
import { signJwt } from "../utils/jwt";
import dayjs from "dayjs";
import bcrypt from "bcryptjs";
import { ProjectUserService } from "./projectUser.service";
require("dotenv").config();

export class UserService {
  private userRepository: UserRepository;
  private projectUserService: ProjectUserService;

  constructor() {
    this.userRepository =
      getConnection("schedule").getCustomRepository(UserRepository);
    this.projectUserService = new ProjectUserService();
  }

  public index = async (page: number = 1, condition?: { status?: string }) => {
    const take = 10;
    const skip = (page - 1) * take;

    let where: { status?: string } = {};

    if (condition?.status) {
      where.status = condition.status;
    }

    return await this.userRepository.find({
      where,
      relations: ['projects'],
      order: {
        id: 'ASC'
      },
      skip: skip,
      take: take
    })
  };

  public search = async (searchKey: string) => {
    let where = {
      email: ILike(`%${searchKey}%`)
    }

    return await this.userRepository.find({
      where
    })
  }

  public findUserById = async (id: number) => {
    return await this.userRepository.findOne({ id });
  };

  public findUserByEmail = async (email: string) => {
    return await this.userRepository.findOne({ email });
  };

  public create = async (user: Partial<User>) => {
    return await this.userRepository.save(this.userRepository.create(user));
  };

  public update =  async(id: number, user: Partial<User>) => {
    const updateResult = await this.userRepository.update(id, user);
    if (updateResult) {
      const updatedUser = await this.findUserById(id);
      return updatedUser;
    }
    return undefined;
  }

  public delete = async (id: number) => {
    return await this.userRepository.delete(id);
  }

  public signTokens = async (user: User) => {
    const access_token = signJwt(
      { sub: user.id },
      "JWT_ACCESS_TOKEN_PRIVATE_KEY",
      {
        expiresIn: `${parseInt(process.env.ACCESS_TOKEN_EXPIRES_IN ?? "1")}d`,
      }
    );

    const refresh_token = signJwt(
      { sub: user.id },
      "JWT_REFRESH_TOKEN_PRIVATE_KEY",
      {
        expiresIn: `${parseInt(process.env.REFRESH_TOKEN_EXPIRES_IN ?? "30")}d`,
      }
    );

    return { access_token, refresh_token };
  };

  public getUsersCount = async () => {
    return await this.userRepository.count({});
  };

  public getNewUsersCountLastDays = async (days: number) => {
    const today = dayjs();
    const dayInPast = dayjs().subtract(days, 'days');

    return await this.userRepository.count({
      where: {
        createdAt: Between(dayInPast, today),
      },
    });
  };

  public getProjectsByUser = async (userId: number) => {
    const projectUsers = await this.projectUserService.getByUser(userId);
    const projects = projectUsers.map(pu => ({
      project: pu.projects,
      services: pu.services
    }));

    return projects;
  }

  public changePassword = async (staffId: number, password: string, newPassword: string) => {
    const staff = await this.findUserById(staffId);

    if (!staff) {
      throw Error('User not found');
    }

    if (!(await User.comparePasswords(password, staff.password))) {
      throw Error('Invalid credentials');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    const updateResult = await this.userRepository.update(staffId, { password: hashedPassword });

    if (updateResult) {
      return staff;
    }
    return undefined;
  }
}
