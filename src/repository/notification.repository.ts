import { EntityRepository, Repository } from "typeorm";
import { Notification } from "../database/entities/notification.entity";

@EntityRepository(Notification)
export class NotificationRepository extends Repository<Notification> {

}
