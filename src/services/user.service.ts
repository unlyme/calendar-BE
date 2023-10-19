import { Between, getConnection } from "typeorm";
import { User } from "../database/entities/user.entity";
import { UserRepository } from "../repository/user.repository";
import { signJwt } from "../utils/jwt";
import dayjs from "dayjs";
require("dotenv").config();

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository =
      getConnection("schedule").getCustomRepository(UserRepository);
  }

  public index = async () => {
    return await this.userRepository.find({
      order: {
        id: "ASC",
      },
    });
  };

  public findUserById = async (id: number) => {
    return await this.userRepository.findOne({ id });
  };

  public findUserByEmail = async (email: string) => {
    return await this.userRepository.findOne({ email });
  };

  public create = async (user: Partial<User>) => {
    return await this.userRepository.save(this.userRepository.create(user));
  };

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
}
