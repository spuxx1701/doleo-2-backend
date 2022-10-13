import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { pushSubscriptionProperties } from './push.subscription.properties';

export default class PushSubscriptionCreateDto {
  @ApiProperty(pushSubscriptionProperties.endpoint)
  @AutoMap()
  @IsString()
  endpoint: string;

  @ApiPropertyOptional(pushSubscriptionProperties.expirationTime)
  @AutoMap()
  @IsNumber()
  @IsOptional()
  expirationTime: number | null;

  @ApiProperty(pushSubscriptionProperties.keys)
  @AutoMap()
  @IsObject()
  keys: { auth: string; p256dh: string };
}
