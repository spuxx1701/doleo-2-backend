import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import FamilyDto from 'src/dtos/family/family.dto';
import Family from 'src/entities/family.entity';
import { mapper } from 'src/mappings/mapper';
import FamiliesService from 'src/services/families.service';

@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Families')
@Controller('families')
export default class FamiliesController {
  constructor(private service: FamiliesService) {}

  @Get()
  @ApiOperation({
    summary: 'Retrieves all families.',
  })
  async findMany(): Promise<FamilyDto[]> {
    const families = await this.service.findMany({
      relations: { members: true },
    });
    return mapper.mapArray(families, Family, FamilyDto);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Retrieves a family by id.',
  })
  async findOne(@Param('id') id: string): Promise<FamilyDto> {
    const family = await this.service.findOne({
      where: { id },
      relations: { members: true },
    });
    return mapper.map(family, Family, FamilyDto);
  }
}
