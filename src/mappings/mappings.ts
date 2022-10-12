import { createMap } from '@automapper/core';
import AccountReadDto from 'src/dtos/account/account.read.dto';
import AccountUpdateDto from 'src/dtos/account/account.update.dto';
import FamilyDto from 'src/dtos/family/family.dto';
import PingCreateDto from 'src/dtos/ping/ping.create.dto';
import PingReadDto from 'src/dtos/ping/ping.read.dto';
import Family from 'src/entities/family.entity';
import Ping from 'src/entities/ping.entity';
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
import UserReadDto from 'src/user/dtos/user.read.dto';
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

  createMap(mapper, AccountUpdateDto, User);

  createMap(mapper, Family, FamilyDto);

  createMap(mapper, Ping, PingReadDto);
  createMap(mapper, PingCreateDto, Ping);
}
