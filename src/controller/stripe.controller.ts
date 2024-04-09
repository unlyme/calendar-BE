import { Response, Request } from "express"
import { StripeService } from "../services/stripe.service";
import { User } from "../database/entities/user.entity";

export class StripeController {
  private stripeService: StripeService;

  constructor() {
    this.stripeService = new StripeService();
  }

  public topup = async (req: Request, res: Response) => {
    try {
      const user = res['locals']['user'] as User;
      const { amount, currency } = req.body;
      const session = await this.stripeService.topup(user, amount, currency);
      return res.status(200).json({ sessionUrl: session.url });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  public webhook = async (req: Request, res: Response) => {
    try {
      const payload = req.body;
      const sig = req.headers['stripe-signature'];

      // Debug
      console.log('===== payload', req.body);
      console.log('===== sig', sig);

      const event = this.stripeService.verifyWebhookEvent(payload, sig);
      await this.stripeService.postTopup(event);

      return res.status(200).json({ success: true });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
