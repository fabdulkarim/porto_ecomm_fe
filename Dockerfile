FROM nginx:stable
MAINTAINER Fadhil "Fadhil Abdulkarim"

RUN mkdir -p /alterra/www/react
RUN mkdir -p /alterra/logs/nginx

COPY default.conf /etc/nginx/conf.d/
COPY . /alterra/www/react

WORKDIR /alterra/www/react
