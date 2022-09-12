import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Put,
  Request,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
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
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
export class AccountController {
  constructor(private service: AccountService) {}

  @Get()
  @ApiOperation({
    summary: 'Retrieves your account.',
  })
  async read(@Request() request): Promise<AccountReadDto> {
    const account = await this.service.read(request.user);
    return mapper.map(account, User, AccountReadDto);
  }
  @Put()
  @ApiOperation({
    summary: 'Updates your account.',
  })
  async update(
    @Request() request,
    @Body() body: AccountUpdateDto,
  ): Promise<AccountReadDto> {
    const updatedAccount = await this.service.update(body, request.user);
    return mapper.map(updatedAccount, User, AccountReadDto);
  }
}
