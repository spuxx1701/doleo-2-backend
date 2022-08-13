import { createMap } from '@automapper/core';
import FamilyDto from 'src/dtos/family/family.dto';
import ListEntryDto from 'src/dtos/list-entry/list-entry.dto';
import ListEntryReadDto from 'src/dtos/list-entry/list-entry.read.dto';
import ListCreateDto from 'src/dtos/list/list.create.dto';
import ListDto from 'src/dtos/list/list.dto';
import ListReadDto from 'src/dtos/list/list.read.dto';
import ListUpdateDto from 'src/dtos/list/list.update.dto';
import UserDto from 'src/dtos/user/user.dto';
import Family from 'src/entities/family.entity';
import ListEntry from 'src/entities/list-entry.entity';
import List from 'src/entities/list.entity';
import User from 'src/entities/user.entity';
import { mapper } from './mapper';

export function createMappings() {
  createMap(mapper, ListEntry, ListEntryDto);
  createMap(mapper, ListEntry, ListEntryReadDto);
  createMap(mapper, List, ListDto);
  createMap(mapper, List, ListReadDto);
  createMap(mapper, ListCreateDto, List);
  createMap(mapper, ListUpdateDto, List);
  createMap(mapper, User, UserDto);
  createMap(mapper, Family, FamilyDto);
}
