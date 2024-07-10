import { getConnection } from "typeorm";
import { Note } from "../database/entities/note.entity";
import { NoteRepository } from "../repository/note.repository";
import bcrypt from "bcryptjs";

export class NoteService {
  private noteRepository: NoteRepository;
  constructor() {
    this.noteRepository =
      getConnection("schedule").getCustomRepository(NoteRepository);
  }

  public index = async (userId: number, projectId: number) => {
    return await this.noteRepository.find({
      where: {
        userId: userId,
        projectId: projectId,
      },
      order: {
        id: "DESC",
      },
    });
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
    const match = await Note.comparePasswords(password, record?.password!)
    return match;
  }
}
