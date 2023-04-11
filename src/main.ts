import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { createMappings } from './mappings/mappings';
import { ValidationPipe } from '@nestjs/common';
import { buildSwaggerConfig } from './config/swagger.config';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const origins = configService.get<string>('CORS_ALLOWED_ORIGINS').split(',');
  app.enableCors({
    origin: origins,
    allowedHeaders: ['content-type', 'authorization'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: false }));

  const document = SwaggerModule.createDocument(app, buildSwaggerConfig());
  SwaggerModule.setup('/swagger', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  createMappings();

  await app.listen(3000);
}
bootstrap();
