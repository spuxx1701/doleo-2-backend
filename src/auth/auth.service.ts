import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import UsersService from 'src/services/users.service';
import User from 'src/entities/user.entity';

const saltRounds = 10;

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOne({
      where: {
        email,
      },
    });
    if (user && (await this.compare(password, user.password))) {
      return user;
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
    Logger.log(
      `User '${user.displayName}' (${user.id}) has signed in.`,
      this.constructor.name,
    );
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async hash(plaintext: string) {
    const hashed = await bcrypt.hash(plaintext, saltRounds);
    return hashed;
  }

  async compare(plaintext: string, hash: string) {
    const result = await bcrypt.compare(plaintext, hash);
    return result;
  }
}
