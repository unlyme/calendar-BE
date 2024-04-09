import { Router } from "express";
import { StripeController } from "../controller/stripe.controller";
import { deserializeUser } from "../middleware/deserializeUser";
import * as bodyParser from 'body-parser';

export const stripeRoutes = () => {
  const router = Router();
  const stripeController = new StripeController();

  router.post('/topup', deserializeUser, stripeController.topup);
  router.post('/webhook', bodyParser.raw({type: 'application/json'}), stripeController.webhook);

  return router;
};
