import { EntityRepository, Repository } from "typeorm";
import { Note } from "../database/entities/note.entity";

@EntityRepository(Note)
export class NoteRepository extends Repository<Note> {

}
