import { getConnection } from "typeorm";
import { RequestAccessRepository } from "../repository/requestAccess.repository";

export class RequestAccessService {
  private requestAccessRepository: RequestAccessRepository;

  constructor() {
    this.requestAccessRepository =
      getConnection("schedule").getCustomRepository(RequestAccessRepository);
  }

  public create = async (email: string) => {
    const requestAccess = await this.requestAccessRepository.save(
      this.requestAccessRepository.create({
        email
      })
    );

    return requestAccess;
  };
}
