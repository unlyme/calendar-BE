import express from 'express';
import { createConnection } from 'typeorm';
import { CalendarController } from './controller/calendar.controller';
import { EventController } from './controller/event.controller';
import { SectionController } from './controller/section.controller';
import { UnitController } from './controller/unit.controller';
import { UserController } from './controller/user.controller';
import config from './ormconfig';
import { AuthController } from "./controller/auth.controller";
require('dotenv').config();

class Server {
  private calendarController: CalendarController;
  private eventController: EventController;
  private sectionController: SectionController;
  private unitController: UnitController;
  private userController: UserController;
  private authController: AuthController;
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

    this.calendarController = new CalendarController();
    this.eventController = new EventController();
    this.sectionController = new SectionController();
    this.unitController = new UnitController();
    this.userController = new UserController();
    this.authController = new AuthController();

    this.app.use(`/calendars/`,this.calendarController.router);
    this.app.use(`/events/`,this.eventController.router);
    this.app.use(`/sections/`,this.sectionController.router);
    this.app.use(`/units/`,this.unitController.router);
    this.app.use(`/users/`,this.userController.router);
    this.app.use(`/auth/`,this.authController.router);
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
