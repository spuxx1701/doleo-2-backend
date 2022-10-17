import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { LoggingInterceptor } from 'src/interceptors/logging';
import { mapper } from 'src/mappings/mapper';
import User from 'src/user/entities/user.entity';
import ListInviteReadDto from '../dtos/list-invite/list-invite.read.dto';
import ListInvite from '../entities/list-invite.entity';
import ListInvitesService from '../services/list-invites.service';

@Controller('listInvites')
@ApiTags('List invites')
@UseInterceptors(ClassSerializerInterceptor, LoggingInterceptor)
@UsePipes(new ValidationPipe({ transform: true }))
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
export default class ListInvitesController {
  constructor(private service: ListInvitesService) {}

  @Get()
  @ApiOperation({
    summary: 'Returns all incoming list invites for the signed in user.',
  })
  async findAll(@Request() request) {
    const invites = await this.service.findIncoming(request.user as User);
    return mapper.mapArray(invites, ListInvite, ListInviteReadDto);
  }

  @Post(':id/accept')
  @ApiOperation({
    summary: 'Accepts an incoming list invite.',
  })
  async accept(@Param('id') id: string, @Request() request): Promise<void> {
    await this.service.accept(id, request.user);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deletes a list invitation.',
  })
  async delete(@Param('id') id: string, @Request() request): Promise<void> {
    return await this.service.delete(id, request.user);
  }
}
