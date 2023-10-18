import { Response, Request } from "express";
import Note from "../database/entities/note.entity";
import { TaskService } from "../services/task.service";
import { User } from "../database/entities/user.entity";
import Task from "../database/entities/task.entity";

export class TaskController {
  private taskService: TaskService;

  constructor(){
    this.taskService = new TaskService();
  }

  public index = async (_req: Request, res: Response) => {
    const user = res['locals']['user'] as User;
    const tasks = await this.taskService.index(user.id);
    return res.json({ status: 200, data: { tasks } });
  }

  public update = async (req: Request, res: Response) => {
    const task = req['body'] as Task;
    const id =  req['params']['id'];
    const updatedTask = await this.taskService.update(Number(id), task);
    if (updatedTask) {
      return res.json({ status: 200, data: { task: task }});
    } else {
      return res.json({ status: 400, error: 'Failed to update task' })
    }
  }
}
