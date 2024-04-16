`Steps To Run Backend Locally`
1) Install Npm Packages  via `npm install` command

2) Check env-example file and make an env file similar to that in root path

3) Techstack used for backend is Nest JS

4) Packages Used in Application are [Axios,Bull,Cheerio]

5) Install Redis Locally on your Machine

6) Add `localhost` in REDIS_HOST environment variable

7) Website Used for scrapping is `https://github.com/explore`, add it in WEBSITE_URL environment variable

8) After Installing Redis run command `redis-server` in terminal

9) Run server using command `npm run start:dev`

10) Path of file saved will be `src/common/files`

`----------------------------------------------------------------------------------------------------------------------`

`Steps To Run Backend Via Docker`
1) Install Docker on your machine

2) Check env-example file and make an env file similar to that in root path

3) Techstack used for backend is Nest JS

4) Packages Used in Application are [Axios,Bull,Cheerio]

5) Add `webcrawler-redis` in REDIS_HOST environment variable

6) Website Used for scrapping is `https://github.com/explore`, add it in WEBSITE_URL environment variable

7) Run server using command `docker compose up`

8) Path of file saved will be `src/common/files`