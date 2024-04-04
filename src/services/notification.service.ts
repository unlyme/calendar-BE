import Notification from "../database/entities/notification.entity";
import { NotificationRepository } from "../repository/notification.repository";
import { getConnection } from "typeorm";

export class NotificationService {
  private notificationRepository: NotificationRepository;

  constructor() {
    this.notificationRepository = getConnection("schedule").getCustomRepository(
      NotificationRepository
    );
  }

  public listByUser = async (userId: number) => {
    return await this.notificationRepository.find({
      where: {
        userId: userId,
      },
      order: {
        createdAt: "DESC",
      },
    });
  };

  public create = async (notification: Notification) => {
    return await this.notificationRepository.save(notification);
  };
}
