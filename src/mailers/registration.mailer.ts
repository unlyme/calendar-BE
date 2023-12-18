import nodemailer, { Transporter } from 'nodemailer';
import { registrationTemplate } from './templates/registration.template';

export class RegistrationMailer {
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
    firstName: string,
    lastName: string,
    projectName: string,
    email: string,
    password: string
  ) => {
    try {
      let html = registrationTemplate;
      html = html.replace('{{FIRST_NAME}}', firstName);
      html = html.replace('{{LASTNAME}}', lastName);
      html = html.replace('{{PROJECT_NAME}}', projectName);
      html = html.replace('{{FE_URL}}', process.env.FE_URL as string);
      html = html.replace('{{FE_HOST}}', process.env.FE_URL as string);
      html = html.replace('{{EMAIL}}', email);
      html = html.replace('{{PASSWORD}}', password);

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
