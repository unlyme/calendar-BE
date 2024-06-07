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

  public index = async (req: Request, res: Response) => {
    try {
      const projectId = req.query.projectId!.toString();
      const tasks = await this.taskService.index(parseInt(projectId));
      return res.status(200).json({ tasks });
    } catch (error: any) {
      return res.status(400).json({ error: error.message })
    }
  }

  public update = async (req: Request, res: Response) => {
    try {
      const task = req['body'] as Task;
      const id =  req['params']['id'];
      const updatedTask = await this.taskService.update(Number(id), task);
      if (updatedTask) {
        return res.status(200).json({ task });
      } else {
        return res.status(400).json({ error: 'Failed to update task' })
      }
    } catch (error: any) {
      return res.status(400).json({ error: error.message })
    }
  }
}
