FROM node:current-alpine3.18 as builder

WORKDIR /usr/src/app
COPY package.json .
RUN npm install
COPY . .

RUN apk add --no-cache curl
RUN apk add --no-cache bash

ENV DOCKERIZE_VERSION v0.19.0
RUN curl -sfL \
	https://github.com/powerman/dockerize/releases/download/${DOCKERIZE_VERSION}/dockerize-$(uname -s)-$(uname -m) | \
	install /dev/stdin /usr/local/bin/dockerize
