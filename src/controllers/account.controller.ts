import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Put,
  Query,
  Request,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import AccountReadDto from 'src/dtos/account/account.read.dto';
import AccountUpdateDto from 'src/dtos/account/account.update.dto';
import { LoggingInterceptor } from 'src/interceptors/logging';
import AccountService from 'src/services/account.service';
import { mapper } from 'src/mappings/mapper';
import User from 'src/entities/user.entity';

@Controller('account')
@ApiTags('Account')
@UseInterceptors(ClassSerializerInterceptor, LoggingInterceptor)
@UsePipes(new ValidationPipe({ transform: true }))
export class AccountController {
  constructor(private service: AccountService) {}

  @Get()
  @ApiOperation({
    summary: 'Retrieves your account.',
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  async read(@Request() request): Promise<AccountReadDto> {
    const account = await this.service.read(request.user);
    return mapper.map(account, User, AccountReadDto);
  }

  @Put()
  @ApiOperation({
    summary: 'Updates your account.',
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  async update(
    @Request() request,
    @Body() body: AccountUpdateDto,
  ): Promise<AccountReadDto> {
    const updatedAccount = await this.service.update(body, request.user);
    return mapper.map(updatedAccount, User, AccountReadDto);
  }

  @Get('/reset-password')
  @ApiOperation({
    summary: 'Attempts to reset your password.',
  })
  async resetPassword(@Query('email') email: string): Promise<void> {
    return this.service.createTempPassword(email);
  }
}
