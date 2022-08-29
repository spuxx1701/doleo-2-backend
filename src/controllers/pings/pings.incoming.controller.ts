import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import PingReadDto from 'src/dtos/ping/ping.read.dto';
import { LoggingInterceptor } from 'src/interceptors/logging';
import PingsService from 'src/services/pings.service';

@UseInterceptors(ClassSerializerInterceptor, LoggingInterceptor)
@ApiTags('Pings (incoming)')
@Controller('incomingPings')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
export default class PingsIncomingController {
  constructor(private service: PingsService) {}

  @Get()
  @ApiOperation({
    summary: 'Retrieves all unseen incoming pings for the signed in user.',
  })
  async findAll(): Promise<PingReadDto[]> {
    const pings = await this.service.findAllReceived();
    return pings;
  }
}
