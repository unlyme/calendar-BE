import Stripe from "stripe";
import { User } from "../database/entities/user.entity";
import { UserService } from "./user.service";

export class StripeService {
  private stripe: Stripe;
  private userService: UserService;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SK_KEY!);
    this.userService = new UserService();
  }

  public topup = async (user: User, amount: number, currency: string) => {
    // const webhookEndpoint = await this.stripe.webhookEndpoints.create({
    //   enabled_events: ['*'],
    //   url: 'https://id.unlyme.com/api/stripe/webhook/endpoint',
    // });

    // console.log('?>?>?>?>?>?>?>', webhookEndpoint);

    // return { url: webhookEndpoint };

    const unitAmount = amount * 100;

    const existingUsersRes = await this.stripe.customers.list({
      email: user.email,
    });

    const { data: existingUsers } = existingUsersRes;
    let customer = existingUsers[0];

    if (!customer) {
      customer = await this.stripe.customers.create({
        email: user.email,
      });
    }

    const sessionData: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ["card"],
      customer: customer.id,
      line_items: [
        {
          price_data: {
            currency: currency,
            unit_amount: unitAmount,
            product_data: {
              name: `Topup for ${user.firstName} ${user.lastName}`,
            },
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.FE_URL}?topupstatus=success`,
      cancel_url: `${process.env.FE_URL}?topupstatus=cancelled`,
      metadata: {
        internalUserId: user.id,
      },
    };
    const session = await this.stripe.checkout.sessions.create(sessionData);

    return session;
  };

  public verifyWebhookEvent = (payload: any, sig: any) => {
    const endpointSecret = process.env.STRIPE_WHSEC!;
    let event;
    event = this.stripe.webhooks.constructEvent(payload, sig, endpointSecret);

    return event;
  };

  public postTopup = async (event: any) => {
    if (event.type === "checkout.session.completed") {
      const sessionWithLineItems = await this.stripe.checkout.sessions.retrieve(
        event.data.object.id,
        {
          expand: ["line_items", "customer"],
        }
      );
      const lineItems = sessionWithLineItems.line_items;

      if (
        lineItems?.data[0] &&
        sessionWithLineItems?.metadata?.internalUserId
      ) {
        const user = await this.userService.findUserById(
          parseInt(sessionWithLineItems.metadata!.internalUserId!)
        );

        if (user) {
          // Fixme: use transaction
          await this.userService.update(user.id, {
            balance: user.balance + lineItems?.data[0].amount_total,
          });
        }
      }
    }

    return true;
  };
}
