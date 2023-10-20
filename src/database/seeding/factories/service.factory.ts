import { define } from "typeorm-seeding"
import { Service } from "../../entities/service.entity"

define(Service, () => {
  const serivce = new Service()
  return serivce
})
