import {Router} from "express";
import {deserializeUser} from "../middleware/deserializeUser";
import { ProjectController } from "../controller/project.controller";
import { ProjectUserController } from "../controller/projectUser.controller";

export const projectRoutes = () => {
  const router = Router();
  const projectController = new ProjectController();
  const projectUserController = new ProjectUserController();

  router.get('/', deserializeUser, projectController.index);
  router.get('/:id/services', deserializeUser, projectController.getServiceUnits);
  router.get('/:id/users', deserializeUser, projectUserController.index);

  return router;
}
