import { EntityRepository, Repository } from "typeorm";
import AccessCode from "../database/entities/accessCode.entity";

@EntityRepository(AccessCode)
export class AccessCodeRepository extends Repository<AccessCode> {}
