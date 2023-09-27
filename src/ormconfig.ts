import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ["build/database/entities/**/*.js"],
  synchronize: true,
  cli: {
    migrationsDir: 'src/migrations',
  }
};

export = config;
