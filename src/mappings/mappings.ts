import { createMap } from '@automapper/core';
import AccountReadDto from 'src/dtos/account/account.read.dto';
import AccountUpdateDto from 'src/dtos/account/account.update.dto';
import FamilyDto from 'src/dtos/family/family.dto';
import PingCreateDto from 'src/dtos/ping/ping.create.dto';
import PingReadDto from 'src/dtos/ping/ping.read.dto';
import UserReadDto from 'src/dtos/user/user.read';
import Family from 'src/entities/family.entity';
import Ping from 'src/entities/ping.entity';
import User from 'src/entities/user.entity';
import ListEntryCreateDto from 'src/lists/dtos/list-entry/list-entry.create.dto';
import ListEntryReadDto from 'src/lists/dtos/list-entry/list-entry.read.dto';
import ListEntryUpdateDto from 'src/lists/dtos/list-entry/list-entry.update.dto';
import ListCreateDto from 'src/lists/dtos/list/list.create.dto';
import ListReadDto from 'src/lists/dtos/list/list.read.dto';
import ListUpdateDto from 'src/lists/dtos/list/list.update.dto';
import ListEntry from 'src/lists/entities/list-entry.entity';
import List from 'src/lists/entities/list.entity';
import { mapper } from './mapper';

export function createMappings() {
  createMap(mapper, ListEntry, ListEntryReadDto);
  createMap(mapper, ListEntryCreateDto, ListEntry);
  createMap(mapper, ListEntryUpdateDto, ListEntry);
  createMap(mapper, List, ListReadDto);
  createMap(mapper, ListCreateDto, List);
  createMap(mapper, ListUpdateDto, List);
  createMap(mapper, User, UserReadDto);
  createMap(mapper, User, AccountReadDto);
  createMap(mapper, AccountUpdateDto, User);
  createMap(mapper, Family, FamilyDto);
  createMap(mapper, Ping, PingReadDto);
  createMap(mapper, PingCreateDto, Ping);
}
