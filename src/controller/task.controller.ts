import { Response, Request } from "express";
import { TaskService } from "../services/task.service";
import Task from "../database/entities/task.entity";

export class TaskController {
  private taskService: TaskService;

  constructor() {
    this.taskService = new TaskService();
  }

  public index = async (req: Request, res: Response) => {
    try {
      const projectId = req.query.projectId!.toString();
      const task = await this.taskService.index(parseInt(projectId));

      if (!task) {
        return res.status(200).json({ task: null });
      }

      return res.status(200).json({ task });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  };

  public create = async (req: Request, res: Response) => {
    try {
      const taskInit = req.body.task as any;
      const id = req["query"]["projectId"];
      const newTask = await this.taskService.create(Number(id), taskInit);
      return res.status(200).json({ task: newTask });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  };

  public update = async (req: Request, res: Response) => {
    try {
      const task = req["body"] as Task;
      const id = req["params"]["id"];
      const updatedTask = await this.taskService.update(Number(id), task);
      if (updatedTask) {
        return res.status(200).json({ task });
      } else {
        return res.status(400).json({ error: "Failed to update task" });
      }
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  };
}
