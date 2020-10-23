FROM node:12

WORKDIR /appuser/app

COPY . /appuser/app

RUN npm install

RUN npm install -g pm2

EXPOSE 8000

CMD ["pm2", "start", "ecosystem.config.js", "--env ", "development"]