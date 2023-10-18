import { EntityRepository, Repository } from "typeorm";
import { Task } from "../database/entities/task.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  // Add custom repository functions here
}
