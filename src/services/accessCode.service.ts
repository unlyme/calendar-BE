import { getConnection } from "typeorm";
import { AccessCodeRepository } from "../repository/accessCode.repository";

export class AccessCodeService {
  private accessCodeRepository: AccessCodeRepository;

  constructor() {
    this.accessCodeRepository =
      getConnection("schedule").getCustomRepository(AccessCodeRepository);
  }

  public getByCode = async (code: string) => {
    const accessCode = await this.accessCodeRepository.findOne({
      code: code
    });

    return accessCode;
  };
}
