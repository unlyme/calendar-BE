import { Router } from "express";
import { StripeController } from "../controller/stripe.controller";
import { deserializeUser } from "../middleware/deserializeUser";

export const stripeRoutes = () => {
  const router = Router();
  const stripeController = new StripeController();

  router.post('/topup', deserializeUser, stripeController.topup);

  return router;
};
