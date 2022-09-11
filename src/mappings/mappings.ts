import { createMap } from '@automapper/core';
import FamilyDto from 'src/dtos/family/family.dto';
import ListEntryCreateDto from 'src/dtos/list-entry/list-entry.create.dto';
import ListEntryReadDto from 'src/dtos/list-entry/list-entry.read.dto';
import ListEntryUpdateDto from 'src/dtos/list-entry/list-entry.update.dto';
import ListCreateDto from 'src/dtos/list/list.create.dto';
import ListReadDto from 'src/dtos/list/list.read.dto';
import ListUpdateDto from 'src/dtos/list/list.update.dto';
import PingReadDto from 'src/dtos/ping/ping.read.dto';
import PingCreateDto from 'src/dtos/ping/ping.create.dto';
import UserReadDto from 'src/dtos/user/user.read';
import Family from 'src/entities/family.entity';
import ListEntry from 'src/entities/list-entry.entity';
import List from 'src/entities/list.entity';
import Ping from 'src/entities/ping.entity';
import User from 'src/entities/user.entity';
import { mapper } from './mapper';
import ProfileReadDto from 'src/dtos/profile/profile.read.dto';
import ProfileUpdateDto from 'src/dtos/profile/profile.update.dto';

export function createMappings() {
  createMap(mapper, ListEntry, ListEntryReadDto);
  createMap(mapper, ListEntryCreateDto, ListEntry);
  createMap(mapper, ListEntryUpdateDto, ListEntry);
  createMap(mapper, List, ListReadDto);
  createMap(mapper, ListCreateDto, List);
  createMap(mapper, ListUpdateDto, List);
  createMap(mapper, User, UserReadDto);
  createMap(mapper, User, ProfileReadDto);
  createMap(mapper, ProfileUpdateDto, User);
  createMap(mapper, Family, FamilyDto);
  createMap(mapper, Ping, PingReadDto);
  createMap(mapper, PingCreateDto, Ping);
}
