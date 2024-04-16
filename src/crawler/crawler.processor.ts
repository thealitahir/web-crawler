import { Logger } from '@nestjs/common';
import { OnQueueCompleted, OnQueueError, Process, Processor } from '@nestjs/bull';

import { Job } from 'bull';

import { CrawlerService } from './crawler.service';

@Processor('website-crawler')
export class CrawlerProcessor {
  constructor(private readonly crawlerService: CrawlerService) { }

  /**
   * Called at Module Initialization.
   *
   * @remarks
   * This method is used to Call Functions at time of module Initialization to perform desired functionality.
   *
   * @beta
   */
  async onModuleInit() {
    await this.crawlerService.crawlWebsite() // Call Crawl Website Method on initial run so User doesnot have to wait for 10 minutes in the beginning to get file data
    await this.crawlerService.addCrawlJob(); // Call Bull Queue Method on initial run so that it calls Crawl Website Method after every 10 Minutes
  }

  /**
 * Function Call For Web Scrapping.
 *
 * @remarks
 * This method is used to call function for web scrapping that creates the file with website data.
 *
 * @returns Json File
 * 
 * @beta
 */
  @Process('web-crawler')
  async startJob() {
    await this.crawlerService.crawlWebsite()
  }

  /**
   * Called on Job Queue Completion.
   *
   * @remarks
   * This method is called on job queue completion which calls the function for web scrapping.
   *
   * @returns Json File
   * 
   * @beta
   */
  @OnQueueCompleted()
  async onCompleted(job: Job<unknown>) {
    // Log job completion status
    Logger.log(`Job ${job.id} has been finished`);
    await this.crawlerService.crawlWebsite()
  }

  /**
   * Called on Job Queue Error Status.
   *
   * @remarks
   * This method is called on job queue error status to give information about the error.
   *
   * @returns Error
   * 
   * @beta
   */
  @OnQueueError()
  onError(error) {
    // Log job error status
    console.log('Queue Job Error', error)
  }
}
