import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
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
import PingReadDto from '../dtos/ping.read.dto';
import Ping from '../entities/ping.entity';
import PingsService from '../services/pings.service';

@Controller('pings')
@ApiTags('Pings')
@UseInterceptors(ClassSerializerInterceptor, LoggingInterceptor)
@UsePipes(new ValidationPipe({ transform: true }))
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
export default class PingsController {
  constructor(private service: PingsService) {}

  @Get()
  @ApiOperation({
    summary: 'Returns all incoming pings for the signed in user.',
  })
  async findIncoming(@Request() request) {
    const pings = await this.service.findIncoming(request.user as User);
    return mapper.mapArray(pings, Ping, PingReadDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deletes a ping.',
  })
  async delete(@Param('id') id: string, @Request() request): Promise<void> {
    return await this.service.delete(id, request.user);
  }
}
