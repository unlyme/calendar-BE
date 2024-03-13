import { Response, Request } from "express";
import { MeetingRoomService } from "../services/meetingRoom.service";
import { MeetingRoom } from "../database/entities/meetingRoom.entity";
import { User } from "../database/entities/user.entity";

export class MeetingRoomController {
  private meetingRoomService: MeetingRoomService;

  constructor() {
    this.meetingRoomService = new MeetingRoomService();
  }

  public index = async (req: Request, res: Response) => {
    try {
      const query = req["query"];
      const user = res["locals"]["user"] as User;
      const { from, to, projectId } = query;

      const meetingRooms = await this.meetingRoomService.index(user.id, {
        from: from as string,
        to: to as string,
        projectId: projectId ? parseInt(projectId?.toString()) : undefined,
      });

      return res.status(200).json({ meetingRooms: meetingRooms });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  };

  public getHistory = async (req: Request, res: Response) => {
    try {
      const query = req["query"];
      const user = res["locals"]["user"] as User;
      const { to, projectId } = query;

      const meetingRooms = await this.meetingRoomService.getHistory(user.id, {
        to: to as string,
        projectId: projectId ? parseInt(projectId?.toString()) : undefined,
      });

      return res.status(200).json({ meetingRooms: meetingRooms });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  };

  public getUpcoming = async (req: Request, res: Response) => {
    try {
      const query = req["query"];
      const user = res["locals"]["user"] as User;
      const { from, projectId } = query;

      const meetingRooms = await this.meetingRoomService.getUpcoming(user.id, {
        from: from as string,
        projectId: projectId ? parseInt(projectId?.toString()) : undefined,
      });

      return res.status(200).json({ meetingRooms: meetingRooms });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  };

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

  public update = async (req: Request, res: Response) => {
    try {
      const payload = req["body"] as Partial<MeetingRoom>;
      const { id } = req["params"];
      const updatedMeetingRoom = await this.meetingRoomService.update(parseInt(id), payload);
      return res.status(200).json({ meetingRoom: updatedMeetingRoom });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  public delete = async (req: Request, res: Response) => {
    try {
      const { id } = req["params"];
      await this.meetingRoomService.delete(parseInt(id));
      return res.status(200).json({ success: true });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

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

  public verifyPassword = async (req: Request, res: Response) => {
    try {
      const params = req["params"];
      const payload = req["body"];
      const { id } = params;
      const boolFlag = await this.meetingRoomService.verifyPassword(
        parseInt(id),
        payload.password
      );
      return res.status(200).json({ isValid: boolFlag });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  };
}
