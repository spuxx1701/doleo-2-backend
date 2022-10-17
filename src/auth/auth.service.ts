import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import AccountService from 'src/account/services/account.service';
import User from 'src/user/entities/user.entity';
import UsersService from 'src/user/services/users.service';
import { compare } from 'src/utils/auth-helper';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private accountService: AccountService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOne({
      where: {
        email,
      },
    });
    if (user) {
      if (await compare(password, user.password)) {
        return user;
      }
      // If the password did not match, we need to check whether user is
      // logging in with a valid temporary password.
      const tempPassword = await this.accountService.getTempPassword(user);
      if (tempPassword && (await compare(password, tempPassword.password))) {
        return user;
      }
    }
    return null;
  }

  async login(user: User) {
    const payload = {
      id: user.id,
      email: user.email,
      displayName: user.displayName,
      selectedDesign: user.selectedDesign,
      sub: user.id,
    };
    user.lastLogin = new Date();
    this.usersService.save(user);
    Logger.log(
      `User '${user.displayName}' (${user.id}) has signed in.`,
      this.constructor.name,
    );
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
