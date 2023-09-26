import {getConnection} from 'typeorm';
import {SectionRepository} from '../repository/section.repository';

export class SectionService {
  private sectionRepository: SectionRepository;
  
  constructor(){
    this.sectionRepository = getConnection("schedule").getCustomRepository(SectionRepository);
  }
  
  public index = async () => {
    return await this.sectionRepository.find({
      order: {
        id: 'ASC'
      }
    });
  }
}
