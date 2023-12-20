import { Column, Entity } from "typeorm";
import BaseEntity from "./base.entity";

@Entity({
  name: "request_accesses",
})
export class RequestAccess extends BaseEntity {
  @Column()
  public email: string;

  @Column({ default: false })
  public sent: boolean
}

export default RequestAccess;
