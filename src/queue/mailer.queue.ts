import Queue from "bull";
import { RegistrationMailer } from "../mailers/registration.mailer";

export const mailerQueue = new Queue(
  "mailer",
  process.env.REDIS_URI || "redis://127.0.0.1:6379"
);

mailerQueue.process(function (job) {
  const mailer = new RegistrationMailer();
  const { firstName, lastName, projectName, email, password } = job.data;

  mailer.send(firstName, lastName, projectName, email, password);

  return Promise.resolve({ success: true });
});
