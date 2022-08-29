import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { createMappings } from './mappings/mappings';
import { ValidationPipe } from '@nestjs/common';
import { buildSwaggerConfig } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());

  const document = SwaggerModule.createDocument(app, buildSwaggerConfig());
  SwaggerModule.setup('/swagger', app, document);

  createMappings();

  await app.listen(3000);
}
bootstrap();
