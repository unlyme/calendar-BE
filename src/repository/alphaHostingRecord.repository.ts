import { EntityRepository, Repository } from "typeorm";
import { AlphaHostingRecord } from "../database/entities/alphaHostingRecord.entity";

@EntityRepository(AlphaHostingRecord)
export class AlphaHostingRecordRepository extends Repository<AlphaHostingRecord> {

}
