import { ConnectionOptions } from "typeorm";

const config: ConnectionOptions & { seeds?: string[]; factories?: string[] } = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ["build/database/entities/**/*.js"],
  synchronize: false,
  migrations: ["build/migrations/*.js"],
  migrationsTableName: "migrations",
  seeds: ["src/database/seeding/seeds/**/*{.ts,.js}"],
  factories: ["src/database/seeding/factories/**/*{.ts,.js}"],
  cli: {
    migrationsDir: "src/migrations",
  },
  ssl: process.env.NODE_ENV === "production",
  extra:
    process.env.NODE_ENV === "production"
      ? {
          ssl: {
            rejectUnauthorized: false,
          },
        }
      : undefined,
};

export = config;
