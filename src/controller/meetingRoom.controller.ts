import { Response, Request } from "express";
import { MeetingRoomService } from "../services/meetingRoom.service";
import { MeetingRoom } from "../database/entities/meetingRoom.entity";
import { User } from "../database/entities/user.entity";

export class MeetingRoomController {
  private meetingRoomService: MeetingRoomService;

  constructor() {
    this.meetingRoomService = new MeetingRoomService();
  }

  public create = async (req: Request, res: Response) => {
    try {
      const payload = req["body"] as MeetingRoom;
      const user = res["locals"]["user"] as User;
      payload.user = user;
      const newMeetingRoom = await this.meetingRoomService.create(payload);
      return res.status(200).json({ meetingRoom: newMeetingRoom });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  };

  public getMeetingRoomByRoomUid = async (req: Request, res: Response) => {
    try {
      const params = req["params"];
      const { roomUid } = params;
      const room = await this.meetingRoomService.getMeetingRoomByRoomUid(
        roomUid
      );

      if (room) {
        return res.status(200).json({ meetingRoom: room });
      }
      return res.status(404).json({ meetingRoom: null });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  };
}
