import { Router } from "express"
import { MeetingRoomController } from "../controller/meetingRoom.controller";
import { deserializeUser } from "../middleware/deserializeUser";

export const meetingRoomRoutes = () => {
  const router = Router();
  const meetingRoomController = new MeetingRoomController();

  router.get('/', deserializeUser, meetingRoomController.index);
  router.post('/', deserializeUser, meetingRoomController.create);
  router.get('/roomUid/:roomUid', meetingRoomController.getMeetingRoomByRoomUid);
  router.post('/:id/verify-password', meetingRoomController.verifyPassword);
  router.put('/:id', deserializeUser, meetingRoomController.update);
  router.get('/get-history', deserializeUser, meetingRoomController.getHistory);
  router.get('/get-upcoming', deserializeUser, meetingRoomController.getUpcoming);
  router.delete('/:id', deserializeUser, meetingRoomController.delete);

  return router;
}
