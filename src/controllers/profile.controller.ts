import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import ProfileReadDto from 'src/dtos/profile/profile.read.dto';
import ProfileUpdateDto from 'src/dtos/profile/profile.update.dto';

@Controller()
@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
  // @Get('profile')
  // @ApiOperation({
  //   summary: 'Retrieves your profile.',
  // })
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth('access-token')
  // getProfile(@Request() request) {
  //   return request.user;
  // }
  // @Put('profile')
  // @ApiOperation({
  //   summary: 'Updates your profile.',
  // })
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth('access-token')
  // updateProfile(
  //   @Param('id') id: string,
  //   @Request() request,
  //   @Body body: ProfileUpdateDto,
  // ): Promise<ProfileReadDto> {
  //   // implement me
  // }
}
