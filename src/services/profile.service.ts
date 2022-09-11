import {
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ProfileUpdateDto from 'src/dtos/profile/profile.update.dto';
import { mapper } from 'src/mappings/mapper';
import { validateOrThrow } from 'src/utils/service-helper';
import { Repository } from 'typeorm';
import User from '../entities/user.entity';

@Injectable()
export default class ProfileService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  async read(user: User): Promise<User> {
    const profile = await this.repository.findOne({
      where: { id: user.id },
      relations: { family: true },
    });
    if (!profile) {
      throw new NotFoundException();
    }
    return profile;
  }

  async update(profileUpdateDto: ProfileUpdateDto, user: User): Promise<User> {
    const partialProfile = {
      id: user.id,
      ...mapper.map(profileUpdateDto, ProfileUpdateDto, User),
    };
    const updatedProfile = await this.repository.preload(partialProfile);
    await validateOrThrow(updatedProfile);
    const result = await this.repository.save(updatedProfile);
    Logger.log(
      `User '${result.displayName}' (${result.id}) updated their profile.`,
      this.constructor.name,
    );
    return result;
  }
}
