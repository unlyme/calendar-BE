import { getConnection } from "typeorm";
import { RequestAccessRepository } from "../repository/requestAccess.repository";
import { SendCodeMailer } from "../mailers/sendCode.mailer";
import { AccessCodeService } from "./accessCode.service";

export class RequestAccessService {
  private requestAccessRepository: RequestAccessRepository;
  private accessCodeService: AccessCodeService;

  constructor() {
    this.requestAccessRepository =
      getConnection("schedule").getCustomRepository(RequestAccessRepository);
    this.accessCodeService = new AccessCodeService();
  }

  public index = async () => {
    const requestAccesses = await this.requestAccessRepository.find({
      order: { sent: 'DESC', createdAt: 'DESC' }
    });

    return requestAccesses;
  }

  public create = async (email: string) => {
    const requestAccess = await this.requestAccessRepository.save(
      this.requestAccessRepository.create({
        email
      })
    );

    return requestAccess;
  };

  public sendCode = async (id: number) => {
    const requestAccess = await this.requestAccessRepository.findOne(id);

    if (!requestAccess) {
      throw Error('Request Access not found')
    }

    const accessCode = await this.accessCodeService.generateCode();

    const mailer = new SendCodeMailer();
    await mailer.send(requestAccess.email, accessCode.code);

    await this.requestAccessRepository.update(requestAccess.id, { sent: true });

    const updatedRequestAccess = await this.requestAccessRepository.findOne(id);

    return updatedRequestAccess;
  }
}
