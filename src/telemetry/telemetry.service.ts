import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { mapper } from 'src/mappings/mapper';
import { LessThan, Repository } from 'typeorm';
import ClientErrorCreateDto from './client-errors/client-error.create.dto';
import ClientError from './client-errors/client-error.entity';

@Injectable()
export default class TelemetryService {
  constructor(
    @InjectRepository(ClientError)
    private clientErrorRepository: Repository<ClientError>,
  ) {}

  async getAllClientErrors(): Promise<ClientError[]> {
    return this.clientErrorRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async postClientError(clientErrorDto: ClientErrorCreateDto, request: any) {
    const clientError: Partial<ClientError> = mapper.map(
      clientErrorDto,
      ClientErrorCreateDto,
      ClientError,
    );
    const result = await this.clientErrorRepository.save(clientError);
    Logger.log(
      `Client ${request.ip} has posted a client error (${result.id}).`,
      this.constructor.name,
    );
    return result;
  }

  async deleteClientError(id: string): Promise<void> {
    const clientError = await this.clientErrorRepository.findBy({ id });
    if (clientError) {
      await this.clientErrorRepository.delete({ id });
    }
  }

  @Cron('0 0 0 * * *')
  async cleanUpClientErrors() {
    const jobName = 'ClientErrorCleanup';
    const context = `${this.constructor.name} (${jobName})`;
    Logger.log(`Starting job.`, context);
    const threshold = new Date(new Date().getTime() - 14 * 24 * 60 * 60 * 1000);
    const oldClientErrors = await this.clientErrorRepository.find({
      where: {
        createdAt: LessThan(threshold),
      },
    });
    Logger.log(`Found ${oldClientErrors.length} old client errors.`, context);
    for (const clientError of oldClientErrors) {
      await this.deleteClientError(clientError.id);
    }
    Logger.log(`Job finished.`, context);
  }
}
