import { EntityRepository, Repository } from "typeorm";
import { HostingRecord } from "../database/entities/hostingRecord.entity";

@EntityRepository(HostingRecord)
export class HostingRecordRepository extends Repository<HostingRecord> {

}
