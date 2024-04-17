import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { ConfigService } from '@nestjs/config';

import { Job, Queue } from 'bull';

import { WebScrapping } from 'src/common/strategies/crawler.strategy';

@Injectable()
export class CrawlerService {
  constructor(@InjectQueue('website-crawler') private readonly queue: Queue, private configService: ConfigService) {}

  /**
  * Returns Nothing.
  *
  * @remarks
  * This method is used to Start Job Queue which will run every 10 minutes and perform the required functionality.
  *
  * @beta
  */
  async addCrawlJob() {
    // await this.queue.add('web-crawler', {}, { repeat: { cron: '*/10 * * * * *' } }); // Job Queue Every 10 Seconds
    await this.queue.add('web-crawler', {}, { repeat: { cron: '*/10 * * * *' } }); // Job Queue Every 10 Minutes
    return
  }

  /**
  * Returns the data of website in a file.
  *
  * @remarks
  * This method is used to extract data from the given url of website and input that data in json file.
  *
  * @param x - The first input url of website
  * @returns Json File
  *
  * @beta
  */
  async crawlWebsite() {
    const url = this.configService.get("WEBSITE_URL");
    return WebScrapping(url)
  }
}
