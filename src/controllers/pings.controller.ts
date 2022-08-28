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
@ApiTags('Pings')
@Controller('pings')
export default class PingsController {
  constructor(private service: PingsService) {}

  // @Get()
  // @ApiOperation({
  //   summary: 'Retrieves all unseen pings that the signed in user has received.',
  // })
  // async findAllReceived(): Promise<PingReadDto[]> {
  //   const pings = await this.service.findAllReceived({
  //     relations: { sender: true },
  //   });
  //   return pings;
  // }
}
