import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { pushSubscriptionProperties } from './push.subscription.properties';

export default class PushSubscriptionReadDto {
  @ApiProperty(pushSubscriptionProperties.endpoint)
  @AutoMap()
  readonly endpoint: string;

  @ApiPropertyOptional(pushSubscriptionProperties.expirationTime)
  @AutoMap()
  readonly expirationTime: number | null;
}
