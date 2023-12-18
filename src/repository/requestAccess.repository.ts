import { EntityRepository, Repository } from "typeorm";
import RequestAccess from "../database/entities/requestAccess.entity";

@EntityRepository(RequestAccess)
export class RequestAccessRepository extends Repository<RequestAccess> {}
