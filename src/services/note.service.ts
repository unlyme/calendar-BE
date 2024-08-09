import { getConnection } from "typeorm";
import { Note } from "../database/entities/note.entity";
import { NoteRepository } from "../repository/note.repository";
import bcrypt from "bcryptjs";
import { uniqBy } from "lodash";

export class NoteService {
  private noteRepository: NoteRepository;
  constructor() {
    this.noteRepository =
      getConnection("schedule").getCustomRepository(NoteRepository);
  }

  public index = async (currentUserId: number, projectId: number) => {
    const ownedNotes = await this.noteRepository.find({
      where: {
        userId: currentUserId,
        projectId: projectId,
      },
      order: {
        id: "DESC",
      },
    });

    const projectNotes = await this.noteRepository.find({
      where: {
        projectId: projectId,
      },
    });

    const sharedNotes = projectNotes.filter((r) => {
      if (r.visibility === "ALL") {
        return true;
      }
      if (r.visibility === "MEMBERS") {
        const members = r.members as Array<any>;
        if (members?.find((m) => m["id"] === currentUserId)) {
          return true;
        }
      }

      return false;
    });

    const data = [...ownedNotes, ...sharedNotes];
    const finalData = uniqBy(data, 'id')

    return finalData;
  };

  public findNoteById = async (id: number) => {
    return await this.noteRepository.findOne(id);
  };

  public create = async (note: Note) => {
    return await this.noteRepository.save(note);
  };

  public update = async (id: number, note: Partial<Note>) => {
    if (note.password) {
      note.password = await bcrypt.hash(note.password, 12);
    }

    const updateResult = await this.noteRepository.update(id, note);

    if (updateResult) {
      const updatedNote = await this.findNoteById(id);
      return updatedNote;
    }
    return undefined;
  };

  public delete = async (id: number) => {
    return await this.noteRepository.delete(id);
  };

  public verifyPassword = async (id: number, password: string) => {
    const record = await this.findNoteById(id);
    const match = await Note.comparePasswords(password, record?.password!);
    return match;
  };
}
