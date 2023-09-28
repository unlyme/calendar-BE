import {getConnection} from 'typeorm';
import config from "config";
import {User} from '../database/entities/user.entity';
import {UserRepository} from '../repository/user.repository';
import redisClient from "../utils/connectRedis";
import {signJwt} from "../utils/jwt";

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
      EX: config.get<number>('redisCacheExpiresIn') * 60,
    });
    
    // 2. Create Access and Refresh tokens
    const access_token = signJwt({ sub: user.id }, 'accessTokenPrivateKey', {
      expiresIn: `${config.get<number>('accessTokenExpiresIn')}m`,
    });
    
    const refresh_token = signJwt({ sub: user.id }, 'refreshTokenPrivateKey', {
      expiresIn: `${config.get<number>('refreshTokenExpiresIn')}m`,
    });
    
    return { access_token, refresh_token };
  }
}
