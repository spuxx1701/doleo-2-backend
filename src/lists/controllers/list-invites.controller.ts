import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
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
import ListInviteCreateDto from '../dtos/list-invite/list-invite.create.dto';
import ListInviteReadDto from '../dtos/list-invite/list-invite.read.dto';
import ListInviteUpdateDto from '../dtos/list-invite/list-invite.update.dto';
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

  @Post()
  @ApiOperation({
    summary: 'Creates a mew list invitation.',
  })
  async create(
    @Body() dto: ListInviteCreateDto,
    @Request() request,
  ): Promise<ListInviteReadDto> {
    const invite = await this.service.create(dto, request.user);
    return mapper.map(invite, ListInvite, ListInviteReadDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deletes a list invitation.',
  })
  async delete(@Param('id') id: string, @Request() request): Promise<void> {
    return await this.service.delete(id, request.user);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Updates a list invite.',
  })
  async update(
    @Param('id') id: string,
    @Body() body: ListInviteUpdateDto,
    @Request() request,
  ): Promise<ListInviteReadDto> {
    if (body.notificationSent) {
      const invite = await this.service.markAsNotificationSent(
        id,
        request.user,
      );
      return mapper.map(invite, ListInvite, ListInviteReadDto);
    } else if (body.accept) {
      const invite = await this.service.accept(id, request.user);
      return mapper.map(invite, ListInvite, ListInviteReadDto);
    }
  }
}
