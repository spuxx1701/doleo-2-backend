import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import PingReadDto from 'src/dtos/ping/ping.read.dto';
import { LoggingInterceptor } from 'src/interceptors/logging';
import PingsService from 'src/services/pings.service';

@UseInterceptors(ClassSerializerInterceptor, LoggingInterceptor)
@ApiTags('Pings (received)')
@Controller('receivedPings')
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
