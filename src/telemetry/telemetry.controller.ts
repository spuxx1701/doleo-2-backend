import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
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
import ClientErrorDto from './client-errors/client-error.create.dto';
import ClientError from './client-errors/client-error.entity';
import ClientErrorReadDto from './client-errors/client-error.read.dto';
import TelemetryService from './telemetry.service';

@Controller('telemetry')
@ApiTags('Telemetry')
@UseInterceptors(ClassSerializerInterceptor, LoggingInterceptor)
export default class TelemetryController {
  constructor(private service: TelemetryService) {}

  @Get('/clientErrors')
  @ApiOperation({
    summary: 'Returns client-side errors for debugging purposes.',
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  async getAllClientErrors(): Promise<ClientErrorReadDto[]> {
    const clientErrors = await this.service.getAllClientErrors();
    return mapper.mapArray(clientErrors, ClientError, ClientErrorReadDto);
  }

  @Post('/clientErrors')
  @ApiOperation({ summary: 'Posts a client-side error.' })
  @UsePipes(new ValidationPipe({ transform: true }))
  async postClientError(
    @Body() error: ClientErrorDto,
    @Request() request,
  ): Promise<ClientError> {
    return this.service.postClientError(error, request);
  }
}
