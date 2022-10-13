import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { LoggingInterceptor } from 'src/interceptors/logging';
import { mapper } from 'src/mappings/mapper';
import PushSubscriptionCreateDto from '../dtos/push-subscription.create.dto';
import PushSubscriptionReadDto from '../dtos/push-subscription.read.dto';
import PushSubscription from '../entities/push-subscription';
import PushSubscriptionsService from '../services/push-notifications.service';

@UseInterceptors(ClassSerializerInterceptor, LoggingInterceptor)
@ApiTags('Push subscriptions')
@Controller('pushSubscriptions')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
export default class PushSubscriptionsController {
  constructor(private service: PushSubscriptionsService) {}

  @Post()
  @ApiOperation({
    summary: 'Subscribes a client to the push API.',
  })
  async subscribe(
    @Body() body: PushSubscriptionCreateDto,
    @Request() request: any,
  ): Promise<PushSubscriptionReadDto> {
    const pushSubscription = await this.service.subscribe(body, request.user);
    return mapper.map(
      pushSubscription,
      PushSubscription,
      PushSubscriptionReadDto,
    );
  }
}
