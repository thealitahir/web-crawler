// src/crawler/job.ts
import { Logger } from '@nestjs/common';
import * as cheerio from 'cheerio';
import * as path from 'path';
import * as fs from 'fs';

export const WebScrapping = async (webUrl) => {
    Logger.log('website crawling started...');
    try {
        const url = encodeURI(webUrl);
        // Fetching Dom Data
        const response = await fetch(url);
        if (response.ok) {
            const html = await response.text();
            getRepositoriesData(html)
        } else {
            Logger.log('Failed to fetch:', response.status);
        }
    } catch (error) {
        Logger.log('Error while scraping:', error);
    }
}

const getRepositoriesData = (html) => {
    const $ = cheerio.load(html);
    const folderPath = 'src/common/files'; // Folder Path
    const filename = path.join(folderPath, `github_scraped_data.json`);
    const repositories = [];
    // Extracting Relevant Data from Dom
    $('article.border.rounded.color-shadow-small.color-bg-subtle.my-4').each((index, element) => {
        const owner = $(element).find('.f3 .Link').first().text().trim();
        const name = $(element).find('.f3 .text-bold').last().text().trim();
        const description = $(element).find('p').last().text().trim();
        const stars = $(element).find('.Counter.js-social-count').text().trim();
        const language = $(element).find('span[itemprop="programmingLanguage"]').text().trim();
        const date = $(element).find('relative-time').attr('datetime');
        const tags = [];

        $(element).find('.topic-tag-link').each((index, tagElement) => {
            const tag = $(tagElement).text().trim();
            tags.push(tag);
        });

        repositories.push({
            owner,
            name,
            description,
            stars,
            language,
            date,
            tags,
        });
    });

    try {
        // Create directory if it doesn't exist
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }

        // Deleting Previous File
        if (fs.existsSync(filename)) {
            fs.unlinkSync(filename);
        }
        // Write data to JSON file
        fs.writeFileSync(filename, JSON.stringify(repositories, null, 2));
    } catch (error) {
        Logger.log('Error writing to file:', error);
    }
}