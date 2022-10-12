import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import User from 'src/user/entities/user.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendTemporaryPassword(user: User, password: string) {
    const url = process.env.APP_CLIENT_URL + '/login';
    const mailType = 'temporary-password';

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Dein temporäres Passwort',
      template: `./${mailType}`,
      context: {
        name: user.displayName,
        password: password,
        url,
      },
    });

    Logger.log(
      `Email '${mailType}' sent to '${user.email}'.`,
      this.constructor.name,
    );
  }
}
