import { Global, Module } from '@nestjs/common';
import Configuration from 'src/configuration/configuration';

@Global()
@Module({
  providers: [Configuration],
  exports: [],
})
export default class CoreModule {}
