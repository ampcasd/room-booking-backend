import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);
  const config = new DocumentBuilder()
    .setTitle('Room Booking System')
    .setDescription('Coke & Pepsi joint venture')
    .setVersion('1.0')
    .addTag('Available endpoints')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('', app, document);

  await app.listen(configService.get('PORT'));
}

bootstrap();
