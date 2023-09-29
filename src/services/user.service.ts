import {getConnection} from 'typeorm';
import {User} from '../database/entities/user.entity';
import {UserRepository} from '../repository/user.repository';
import redisClient from "../utils/connectRedis";
import {signJwt} from "../utils/jwt";
require('dotenv').config();

export class UserService {
  private userRepository: UserRepository;

  constructor(){
    this.userRepository = getConnection("schedule").getCustomRepository(UserRepository);
  }

  public index = async () => {
    return await this.userRepository.find({
      order: {
        id: 'ASC'
      }
    });
  }
  
  public findUserById = async (id: number) => {
    return await this.userRepository.findOne({ id });
  }
  
  public findUserByEmail = async (email: string) => {
    return await this.userRepository.findOne({ email });
  }
  
  public create = async (user: Partial<User>) => {
    return await this.userRepository.save(this.userRepository.create(user));
  }
  
  public signTokens = async (user: User) => {
    await redisClient.set(`${user.id}`, JSON.stringify(user), {
      EX: parseInt(process.env.REDIS_CACHE_EXPIRES_IN ?? '60') * 60,
    });
    
    // 2. Create Access and Refresh tokens
    const access_token = signJwt({ sub: user.id }, 'JWT_ACCESS_TOKEN_PRIVATE_KEY', {
      expiresIn: `${parseInt(process.env.ACCESS_TOKEN_EXPIRES_IN ?? '15')}m`,
    });
    
    const refresh_token = signJwt({ sub: user.id }, 'JWT_REFRESH_TOKEN_PRIVATE_KEY', {
      expiresIn: `${parseInt(process.env.REFRESH_TOKEN_EXPIRES_IN ?? '60')}m`,
    });
    
    return { access_token, refresh_token };
  }
}
