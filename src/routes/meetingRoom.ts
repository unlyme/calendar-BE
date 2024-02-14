import { Router } from "express"
import { MeetingRoomController } from "../controller/meetingRoom.controller";
import { deserializeUser } from "../middleware/deserializeUser";

export const meetingRoomRoutes = () => {
  const router = Router();
  const meetingRoomController = new MeetingRoomController();

  router.post('/', deserializeUser, meetingRoomController.create);

  return router;
}
