import { EntityRepository, Repository } from "typeorm";
import Section from "../database/entities/section.entity";

@EntityRepository(Section)
export class SectionRepository extends Repository<Section> {

}
