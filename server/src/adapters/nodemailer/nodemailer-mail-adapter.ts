import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from '../mail-adapter';

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "6b1a8a38032955",
    pass: "73e7be36ef31c0"
  }
});

export class NodemailerAdapter implements MailAdapter {
    async sendMail({ subject, body }: SendMailData) {
        await transport.sendMail({
            from: '"Equipe Feedget" <oi@feedget.com>',
            to: 'Felipe <felipinho.lima27@gmail.com>',
            subject,
            html: body,
        })
    }
}
