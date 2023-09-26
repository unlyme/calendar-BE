import {getConnection} from 'typeorm';
import Calendar from '../database/entities/calendar.entity';
import {CalendarRepository} from '../repository/calendar.repository';

export class CalendarService {
  private calendarRepository: CalendarRepository;

  constructor(){
    this.calendarRepository = getConnection("schedule").getCustomRepository(CalendarRepository);
  }

  public index = async () => {
    return await this.calendarRepository.find({
      order: {
        id: 'ASC'
      }
    });
  }

  public create = async (calendar: Calendar) => {
    return await this.calendarRepository.save(calendar);
  }

  public update =  async(calendar: Calendar, id: number) => {
    return await this.calendarRepository.update(id, calendar);
  }

  public delete = async (id: number) => {
    return await this.calendarRepository.delete(id);
  }
}
