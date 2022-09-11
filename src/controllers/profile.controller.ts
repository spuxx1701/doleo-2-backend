import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Put,
  Request,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import ProfileReadDto from 'src/dtos/profile/profile.read.dto';
import ProfileUpdateDto from 'src/dtos/profile/profile.update.dto';
import { LoggingInterceptor } from 'src/interceptors/logging';
import ProfileService from 'src/services/profile.service';
import { mapper } from 'src/mappings/mapper';
import User from 'src/entities/user.entity';

@Controller('profile')
@ApiTags('Profile')
@UseInterceptors(ClassSerializerInterceptor, LoggingInterceptor)
@UsePipes(new ValidationPipe({ transform: true }))
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
export class ProfileController {
  constructor(private service: ProfileService) {}

  @Get()
  @ApiOperation({
    summary: 'Retrieves your profile.',
  })
  async read(@Request() request): Promise<ProfileReadDto> {
    const profile = await this.service.read(request.user);
    return mapper.map(profile, User, ProfileReadDto);
  }
  @Put()
  @ApiOperation({
    summary: 'Updates your profile.',
  })
  async update(
    @Request() request,
    @Body() body: ProfileUpdateDto,
  ): Promise<ProfileReadDto> {
    const updatedProfile = await this.service.update(body, request.user);
    return mapper.map(updatedProfile, User, ProfileReadDto);
  }
}
