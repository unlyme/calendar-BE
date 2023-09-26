import {getConnection} from 'typeorm';
import {UnitRepository} from '../repository/unit.repository';

export class UnitService {
  private unitRepository: UnitRepository;
  
  constructor(){
    this.unitRepository = getConnection("schedule").getCustomRepository(UnitRepository);
  }
  
  public index = async () => {
    return await this.unitRepository.find({
      order: {
        id: 'ASC'
      }
    });
  }
}
