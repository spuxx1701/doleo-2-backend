import { Injectable, Logger as NestLogger } from '@nestjs/common';

@Injectable()
export class Logger extends NestLogger {
  log(text: string) {
    this.log(text);
  }
}
