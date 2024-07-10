import { Response, Request } from "express";
import Note from "../database/entities/note.entity";
import { NoteService } from "../services/note.service";
import { User } from "../database/entities/user.entity";

export class NoteController {
  private noteService: NoteService;

  constructor() {
    this.noteService = new NoteService();
  }

  public index = async (req: Request, res: Response) => {
    try {
      const user = res["locals"]["user"] as User;
      const { projectId } = req.query;
      const notes = await this.noteService.index(
        user.id,
        parseInt(projectId as string)
      );
      return res.status(200).json({ notes });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  };

  public create = async (req: Request, res: Response) => {
    try {
      const notePayload = req["body"] as Note;
      const user = res["locals"]["user"] as User;
      notePayload.user = user;
      const newNote = await this.noteService.create(notePayload);
      return res.status(200).json({ note: newNote });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  };

  public update = async (req: Request, res: Response) => {
    try {
      const note = req["body"] as Note;
      const id = req["params"]["id"];
      const updatedNote = await this.noteService.update(Number(id), note);
      if (updatedNote) {
        return res.json({ status: 200, data: { note: note } });
      } else {
        return res.json({ status: 400, error: "Failed to update note" });
      }
    } catch (error: any) {
      return res.json({ status: 400, error: error.message });
    }
  };

  public delete = async (req: Request, res: Response) => {
    try {
      const id = req["params"]["id"];
      await this.noteService.delete(Number(id));
      return res.json({ status: 200, data: { deleted: true } });
    } catch (error: any) {
      return res.json({ status: 400, error: error.message });
    }
  };

  public verifyPassword = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { password } = req.body;
      const match = await this.noteService.verifyPassword(Number(id), password);
      return res.json({ status: 200, data: { isValid: match } });
    } catch (error: any) {
      return res.json({ status: 400, error: error.message });
    }
  };
}
