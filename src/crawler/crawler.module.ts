import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull/dist/bull.module';

import * as dotenv from 'dotenv'

import { CrawlerService } from './crawler.service';
import { CrawlerProcessor } from './crawler.processor';

dotenv.config()

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
      },
    }),
    BullModule.registerQueue({
      name: 'website-crawler',
    }),
  ],
  providers: [CrawlerService, CrawlerProcessor],
})
export class CrawlerModule { }
