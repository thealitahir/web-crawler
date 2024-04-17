import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const corsOptions = {
    origin: '*',
    methods: '*',
  };
  app.enableCors(corsOptions);

  await app.listen(Number(configService.get('PORT')) || 3001,()=>{
    Logger.log(`Backend running on Port ${Number(configService.get('PORT'))}`);
  });
}
bootstrap();
