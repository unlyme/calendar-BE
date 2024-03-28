import nodemailer, { Transporter } from 'nodemailer';
import { sendCodeTemplate } from './templates/sendCode.template';

export class SendCodeMailer {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAILER_HOST || 'localhost',
      auth: {
        user: process.env.MAILER_USER || 'user',
        pass: process.env.MAILER_PASSWORD || 'password'
      },
      tls: {
        rejectUnauthorized: false
      }
    })
  }

  public send = async (
    email: string,
    code: string
  ) => {
    let html = sendCodeTemplate({
      feHost: process.env.FE_URL as string,
      code
    });

    const message = {
      from: process.env.EMAIl_FROM || 'ai@unlyme.com',
      to: email,
      subject: '[Ulyme] Thank you for requesting access to Unlyme AI OS',
      html: html
    };

    await this.transporter.sendMail(message);

    return true;
  };
}
