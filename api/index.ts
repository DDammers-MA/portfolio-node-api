import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module.js';

let app: any;

async function bootstrap() {
  const nestApp = await NestFactory.create(AppModule);

  nestApp.setGlobalPrefix('api');

  nestApp.enableCors({
    origin: [
      'http://localhost:4200',
      'https://dammienet.eu',
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  nestApp.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  await nestApp.init();

  return nestApp.getHttpAdapter().getInstance();
}

export default async function handler(
  req: any,
  res: any,
) {
  if (!app) {
    app = await bootstrap();
  }

  return app(req, res);
}