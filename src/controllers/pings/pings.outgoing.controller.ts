import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import PingReadDto from 'src/dtos/ping/ping.read.dto';
import { LoggingInterceptor } from 'src/interceptors/logging';
import PingsService from 'src/services/pings.service';

@UseInterceptors(ClassSerializerInterceptor, LoggingInterceptor)
@ApiTags('Pings (outgoing)')
@Controller('outgoingPings')
export default class PingsOutgoingController {
  constructor(private service: PingsService) {}

  @Get()
  @ApiOperation({
    summary: 'Retrieves all unseen outgoing pings for the signed in user.',
  })
  async findAll(): Promise<PingReadDto[]> {
    const pings = await this.service.findAllSent();
    return pings;
  }

  // @Post()
  // @ApiOperation({
  //   summary: 'Creates a new outgoing ping for the signed in user.',
  // })
  // async create(@Body): Promise<PingReadDto> {
  //   const createdPing = await this.service.create({})
  // }
}
