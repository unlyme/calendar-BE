import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";

export default class InitialDatabaseSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await connection
      .createQueryBuilder()
      .insert()
      .into('services')
      .values([
        { name: 'Hosting'},
        { name: 'Calendar' },
        { name: 'Disk' },
      ])
      .execute()
  }
}
