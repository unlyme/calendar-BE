import nodemailer, { Transporter } from 'nodemailer';
import { registrationTemplate } from './templates/registration.template';

export class RegistrationMailer {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAILER_HOST || 'localhost',
      port: 25,
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
    firstName: string,
    lastName: string,
    projectName: string,
    email: string,
    password: string
  ) => {
    try {
      let html = registrationTemplate({
        firstName,
        lastName,
        projectName,
        feHost: process.env.FE_URL as string,
        email,
        password
      });

      const message = {
        from: process.env.EMAIl_FROM || 'ai@unlyme.com',
        to: email,
        subject: '[Ulyme] Thank you for registering with Unlyme AI OS',
        html: html
      };

      await this.transporter.sendMail(message);

      return true;
    } catch (error) {
      console.log('Mailer error:', error);
      return false;
    }
  };
}
