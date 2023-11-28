import {Router} from "express";
import {deserializeUser} from "../middleware/deserializeUser";
import { ProjectController } from "../controller/project.controller";

export const projectRoutes = () => {
  const router = Router();
  const projectController = new ProjectController();

  router.get('/', deserializeUser, projectController.index);
  router.get('/:id/services', deserializeUser, projectController.getServiceUnits);

  return router;
}
