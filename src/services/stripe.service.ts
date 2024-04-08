import Stripe from 'stripe';
import { User } from '../database/entities/user.entity';

export class StripeService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SK_KEY!);
  }

  public topup = async (user: User, amount: number, currency: string) => {
    const sessionData: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: currency,
            unit_amount: amount,
            product_data: {
              name: `Topup for ${user.firstName} ${user.lastName}`
            }
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.FE_URL}?topupstatus=success`,
      cancel_url: `${process.env.FE_URL}?topupstatus=cancelled`,
      metadata: {
        internalUserId: user.id
      }
    }
    const session = await this.stripe.checkout.sessions.create(sessionData);

    return session;
  }
}
