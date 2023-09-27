import {getConnection} from 'typeorm';
import {User} from '../database/entities/user.entity';
import {UserRepository} from '../repository/user.repository';
import {Request, Response} from "express";

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
    return await this.userRepository.find({ id });
  }
  
  public create = async (user: User) => {
    return await this.userRepository.save(user);
  }

  public update =  async(user: User, id: number) => {
    return await this.userRepository.update(id, user);
  }

  public delete = async (id: number) => {
    return await this.userRepository.delete(id);
  }
}
