FROM node:12 AS build

WORKDIR /var/www/app

COPY . /var/www/app
RUN npm install

RUN npm run-script build

FROM nginx:1.17 as production-stage

COPY --from=build  /var/www/app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]