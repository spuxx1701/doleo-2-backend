import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

export default {
  transport: {
    host: process.env.MAIL_HOST,
    secure: false,
    tls: {
      rejectUnauthorized: false,
    },
    debug: process.env.DEBUG,
    // auth: {
    //   user: process.env.MAIL_USER,
    //   pass: process.env.MAIL_PASSWORD,
    // },
  },
  defaults: {
    from: '"Doleo" <noreply@doleo-2.de>',
  },
  template: {
    dir: join(__dirname, 'templates'),
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
};
