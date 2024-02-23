import { Router } from "express"
import { MeetingRoomController } from "../controller/meetingRoom.controller";
import { deserializeUser } from "../middleware/deserializeUser";

export const meetingRoomRoutes = () => {
  const router = Router();
  const meetingRoomController = new MeetingRoomController();

  router.post('/', deserializeUser, meetingRoomController.create);
  router.get('/roomUid/:roomUid', meetingRoomController.getMeetingRoomByRoomUid);
  router.post('/:id/verify-password', meetingRoomController.verifyPassword);

  return router;
}
