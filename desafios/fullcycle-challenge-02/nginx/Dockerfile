FROM nginx:1.25.2 as builder

RUN rm /etc/nginx/conf.d/default.conf
COPY default.conf /etc/nginx/conf.d
