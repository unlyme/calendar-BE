import { getConnection } from "typeorm";
import { AccessCodeRepository } from "../repository/accessCode.repository";

export class AccessCodeService {
  private accessCodeRepository: AccessCodeRepository;

  constructor() {
    this.accessCodeRepository =
      getConnection("schedule").getCustomRepository(AccessCodeRepository);
  }

  public index = async (page: number) => {
    const take = 10;
    const skip = (page - 1) * take;

    return await this.accessCodeRepository.find({
      order: { createdAt: "DESC" },
      skip: skip,
      take: take,
    });
  };

  public getByCode = async (code: string) => {
    const accessCode = await this.accessCodeRepository.findOne({
      code: code,
    });

    return accessCode;
  };

  public updateUsedByEmail = async (id: number, userId: number) => {
    return await this.accessCodeRepository.update(id, { userId });
  };

  public generateCode = async () => {
    const code = Math.random().toString(36).slice(2, 8).toUpperCase();
    return await this.accessCodeRepository.save(
      this.accessCodeRepository.create({ code })
    );
  };
}
