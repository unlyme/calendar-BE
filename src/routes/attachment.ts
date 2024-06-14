import { Router } from "express"
import { AttachmentsController } from "../controller/attachments.controller";
import { deserializeUser } from "../middleware/deserializeUser";

export const attachmentRoutes = () => {
  const router = Router();
  const attachmentController = new AttachmentsController();

  router.post('/gernate-upload-url', deserializeUser, attachmentController.generateUploadUrl);

  return router;
}
