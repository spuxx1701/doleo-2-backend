import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import LoginDto from './dtos/login.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller()
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @Post('auth/login')
  @ApiOperation({
    summary: 'Signs you in.',
  })
  @UseGuards(LocalAuthGuard)
  // We need to add the body parameter to allow logging in via swagger easily.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async login(@Request() request, @Body() body: LoginDto) {
    return this.service.login(request.user);
  }
}
