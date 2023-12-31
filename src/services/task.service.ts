import { getConnection } from "typeorm";
import { TaskRepository } from "../repository/task.repository";
import Task from "../database/entities/task.entity";

export class TaskService {
  private taskRepository: TaskRepository;

  constructor() {
    this.taskRepository =
      getConnection("schedule").getCustomRepository(TaskRepository);
  }

  public index = async (userId: number) => {
    return await this.taskRepository.find({
      where: {
        userId: userId,
      },
      order: {
        id: "ASC",
      },
    });
  };

  public findTaskById = async (id: number) => {
    return await this.taskRepository.findOne(id);
  }

  public update = async (id: number, task: Partial<Task>) => {
    const updateResult = await this.taskRepository.update(id, task);
    if (updateResult) {
      const updatedTask = await this.findTaskById(id);
      return updatedTask;
    }

    return undefined;
  }
}
