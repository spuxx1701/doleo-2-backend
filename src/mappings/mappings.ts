import { createMap } from '@automapper/core';
import AccountReadDto from 'src/account/dtos/account.read.dto';
import AccountUpdateDto from 'src/account/dtos/account.update.dto';
import ClientErrorCreateDto from 'src/telemetry/client-errors/client-error.create.dto';
import ClientError from 'src/telemetry/client-errors/client-error.entity';
import ClientErrorReadDto from 'src/telemetry/client-errors/client-error.read.dto';
import FamilyDto from 'src/dtos/family/family.dto';
import Family from 'src/entities/family.entity';
import ListEntryCreateDto from 'src/lists/dtos/list-entry/list-entry.create.dto';
import ListEntryReadDto from 'src/lists/dtos/list-entry/list-entry.read.dto';
import ListEntryUpdateDto from 'src/lists/dtos/list-entry/list-entry.update.dto';
import ListInviteReadDto from 'src/lists/dtos/list-invite/list-invite.read.dto';
import ListCreateDto from 'src/lists/dtos/list/list.create.dto';
import ListReadDto from 'src/lists/dtos/list/list.read.dto';
import ListUpdateDto from 'src/lists/dtos/list/list.update.dto';
import ListEntry from 'src/lists/entities/list-entry.entity';
import ListInvite from 'src/lists/entities/list-invite.entity';
import List from 'src/lists/entities/list.entity';
import PushSubscriptionCreateDto from 'src/push-subscriptions/dtos/push-subscription.create.dto';
import PushSubscriptionReadDto from 'src/push-subscriptions/dtos/push-subscription.read.dto';
import PushSubscription from 'src/push-subscriptions/entities/push-subscription';
import PingReadDto from 'src/user/dtos/ping.read.dto';
import UserReadDto from 'src/user/dtos/user.read.dto';
import Ping from 'src/user/entities/ping.entity';
import User from 'src/user/entities/user.entity';
import { mapper } from './mapper';

export function createMappings() {
  createMap(mapper, ListEntry, ListEntryReadDto);
  createMap(mapper, ListEntryCreateDto, ListEntry);
  createMap(mapper, ListEntryUpdateDto, ListEntry);

  createMap(mapper, List, ListReadDto);
  createMap(mapper, ListCreateDto, List);
  createMap(mapper, ListUpdateDto, List);

  createMap(mapper, ListInvite, ListInviteReadDto);

  createMap(mapper, User, UserReadDto);
  createMap(mapper, User, AccountReadDto);

  createMap(mapper, Ping, PingReadDto);

  createMap(mapper, AccountUpdateDto, User);

  createMap(mapper, Family, FamilyDto);

  createMap(mapper, PushSubscriptionCreateDto, PushSubscription);
  createMap(mapper, PushSubscription, PushSubscriptionReadDto);

  createMap(mapper, ClientErrorCreateDto, ClientError);
  createMap(mapper, ClientError, ClientErrorReadDto);
}
