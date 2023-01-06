import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ClientError from './client-errors/client-error.entity';
import TelemetryController from './telemetry.controller';
import TelemetryService from './telemetry.service';

@Module({
  imports: [TypeOrmModule.forFeature([ClientError])],
  providers: [TelemetryService],
  controllers: [TelemetryController],
})
export default class TelemetryModule {}
