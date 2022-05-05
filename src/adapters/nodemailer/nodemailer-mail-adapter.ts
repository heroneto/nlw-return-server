import nodemailer from 'nodemailer'
import { MailAdapter, SendMailData } from "../mail-adapter";


const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "53667c78a77523",
    pass: "f0ec6307fb55a1"
  }
});

export class NodeMailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {

    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Heron Eto <hhqe@hotmail.com>',
      subject,
      html: body
    })
  }
}

