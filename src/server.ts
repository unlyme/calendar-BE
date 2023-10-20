import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { createConnection } from 'typeorm';
import { UserController } from './controller/user.controller';
import config from './ormconfig';
import { authRoutes } from "./routes/auth";
import { calendarRoutes } from "./routes/calendar";
import { eventRoutes } from "./routes/event";
import { sectionRoutes } from "./routes/section";
import { unitRoutes } from "./routes/unit";
import { adminRoutes } from './routes/admin';
const swagger = require("./utils/swagger");
require('dotenv').config();

class Server {
  private userController: UserController;
  private app: express.Application;

  constructor(){
    this.app = express(); // init the application
    this.configuration();
    this.routes();
  }

  /**
   * Method to configure the server,
   * If we didn't configure the port into the environment
   * variables it takes the default port 3000
   */
  public configuration() {
    this.app.set('port', process.env.PORT || 3000);
    this.app.use(express.json());
  }

  /**
   * Method to configure the routes
   */
  public async routes(){
    await createConnection({
      ...config,
      name: "schedule"
    });

    this.app.use(cors({
      origin: '*'
    }))
    this.app.use(swagger);
    this.userController = new UserController();

    this.app.use(`/calendars/`, calendarRoutes());
    this.app.use(`/events/`, eventRoutes());
    this.app.use(`/sections/`, sectionRoutes());
    this.app.use(`/units/`, unitRoutes());
    this.app.use(`/auth/`, authRoutes());
    this.app.use('/admin', adminRoutes());
  }

  /**
   * Used to start the server
   */
  public start(){
    this.app.listen(this.app.get('port'), () => {
      console.log(`Server is listening ${this.app.get('port')} port.`);
    });
  }
}

const server = new Server(); // Create server instance
server.start(); // Execute the server
