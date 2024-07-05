import { Between, ILike, In, Like, getConnection } from "typeorm";
import { User } from "../database/entities/user.entity";
import { UserRepository } from "../repository/user.repository";
import { signJwt } from "../utils/jwt";
import dayjs from "dayjs";
import bcrypt from "bcryptjs";
import { ProjectUserService } from "./projectUser.service";
import { ProjectService } from "./project.service";
import { ServiceService } from "./service.service";
import { PROJECT_STATUS } from "../database/enums/project.enum";
import { AccessCodeService } from "./accessCode.service";
import { RegistrationMailer } from "../mailers/registration.mailer";
import { mailerQueue } from "../queue/mailer.queue";
import { NotificationRepository } from "../repository/notification.repository";
require("dotenv").config();

export class UserService {
  private userRepository: UserRepository;
  private projectUserService: ProjectUserService;
  private projectService: ProjectService;
  private serviceService: ServiceService;
  private accessCodeService: AccessCodeService;
  private notificationRepo: NotificationRepository;

  constructor() {
    this.userRepository =
      getConnection("schedule").getCustomRepository(UserRepository);
    this.notificationRepo = getConnection("schedule").getCustomRepository(
      NotificationRepository
    );
    this.projectUserService = new ProjectUserService();
    this.projectService = new ProjectService();
    this.serviceService = new ServiceService();
    this.accessCodeService = new AccessCodeService();
  }

  public index = async (page: number = 1, condition?: { status?: string }) => {
    const take = 10;
    const skip = (page - 1) * take;

    let where: { status?: string } = {};

    if (condition?.status) {
      where.status = condition.status;
    }

    return await this.userRepository.find({
      where,
      relations: ["projects"],
      order: {
        id: "ASC",
      },
      skip: skip,
      take: take,
    });
  };

  public search = async (searchKey: string) => {
    const splitKeys = searchKey.split(" ");

    let where: any = [
      {
        email: ILike(`%${searchKey}%`),
      },
    ];

    if (Number.isInteger(parseInt(searchKey))) {
      where.push({
        id: parseInt(searchKey),
      });
    }

    for (const searchK of splitKeys) {
      where.push({ firstName: ILike(`%${searchK}%`) });
      where.push({ lastName: ILike(`%${searchK}%`) });
    }

    return await this.userRepository.find({
      where,
    });
  };

  public findUserById = async (id: number) => {
    return await this.userRepository.findOne({ id });
  };

  public findUserByEmail = async (email: string) => {
    return await this.userRepository.findOne({ email });
  };

  public findUserByIds = async (ids: number[]) => {
    return await this.userRepository.find({
      id: In(ids),
    });
  };

  public create = async (user: Partial<User>) => {
    return await this.userRepository.save(this.userRepository.create(user));
  };

  public update = async (id: number, user: Partial<User>) => {
    const updateResult = await this.userRepository.update(id, user);
    if (updateResult) {
      const updatedUser = await this.findUserById(id);
      return updatedUser;
    }
    return undefined;
  };

  public delete = async (id: number) => {
    return await this.userRepository.delete(id);
  };

  public signTokens = async (user: User) => {
    const access_token = signJwt(
      { sub: user.id },
      "JWT_ACCESS_TOKEN_PRIVATE_KEY",
      {
        expiresIn: `${parseInt(process.env.ACCESS_TOKEN_EXPIRES_IN ?? "1")}d`,
      }
    );

    const refresh_token = signJwt(
      { sub: user.id },
      "JWT_REFRESH_TOKEN_PRIVATE_KEY",
      {
        expiresIn: `${parseInt(process.env.REFRESH_TOKEN_EXPIRES_IN ?? "30")}d`,
      }
    );

    return { access_token, refresh_token };
  };

  public getUsersCount = async () => {
    return await this.userRepository.count({});
  };

  public getNewUsersCountLastDays = async (days: number) => {
    const today = dayjs();
    const dayInPast = dayjs().subtract(days, "days");

    return await this.userRepository.count({
      where: {
        createdAt: Between(dayInPast, today),
      },
    });
  };

  public getProjectsByUser = async (userId: number) => {
    const projectUsers = await this.projectUserService.getByUser(userId);
    const projects = projectUsers.map((pu) => ({
      project: pu.projects,
      services: pu.services,
    }));

    return projects;
  };

  public changePassword = async (
    staffId: number,
    password: string,
    newPassword: string
  ) => {
    const staff = await this.findUserById(staffId);

    if (!staff) {
      throw Error("User not found");
    }

    if (!(await User.comparePasswords(password, staff.password))) {
      throw Error("Invalid credentials");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    const updateResult = await this.userRepository.update(staffId, {
      password: hashedPassword,
    });

    if (updateResult) {
      return staff;
    }
    return undefined;
  };

  public register = async (
    firstName: string,
    lastName: string,
    email: string,
    projectName: string,
    accessCode: string
  ) => {
    const password = Math.random().toString(36).slice(2, 12);

    const newUser = await this.userRepository.save(
      this.userRepository.create({
        firstName,
        lastName,
        email,
        password,
        contacts: [],
      })
    );

    // default service which activated for all projects
    const calendarService = await this.serviceService.getByName("Calendar");
    const meetService = await this.serviceService.getByName(
      "VideoConferencing"
    );

    const newProject = await this.projectService.create(
      {
        name: projectName,
        status: PROJECT_STATUS.ACTIVE,
        balance: 0,
        geography: "N/A",
      },
      [calendarService!.id, meetService!.id]
    );

    await this.projectService.assginUser(
      Number(newProject.id),
      Number(newUser.id)
    );

    const accessCodeRecord = await this.accessCodeService.getByCode(accessCode);

    if (!accessCodeRecord || accessCodeRecord.userId) {
      throw Error("Invalid code");
    }

    await this.accessCodeService.updateUsedByEmail(
      accessCodeRecord.id,
      newUser.id
    );

    await this.notificationRepo.save({
      category: "general",
      title: `Project ${projectName} has been created`,
      message: `Project ${projectName} has been created`,
      translationKey: "NOTIFICATION.GENERAL.PROJECT_CREATED",
      userId: Number(newUser.id),
    });

    await this.notificationRepo.save({
      category: "general",
      title: `User ${firstName} ${lastName} has been added to the project ${projectName}`,
      message: `User ${firstName} ${lastName} has been added to the project ${projectName}`,
      translationKey: "NOTIFICATION.GENERAL.USER_ADDED_TO_PROJECT",
      userId: Number(newUser.id),
    });
    console.log('>>>>>>>>>>>>>>>>>>>>', password)

    await mailerQueue.add({
      firstName,
      lastName,
      projectName,
      email,
      password,
    });


    // const mailer = new RegistrationMailer();
    // await mailer.send(
    //   firstName,
    //   lastName,
    //   projectName,
    //   email,
    //   password
    // );

    return { newUser };
  };
}
