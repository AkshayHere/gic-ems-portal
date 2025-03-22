FROM node:alpine
# https://stackoverflow.com/questions/63666064/docker-cannot-find-module-bin-bash
RUN apk update && apk upgrade && apk add bash
# https://dev.to/pulimoodan/prisma-could-not-parse-schema-engine-response-4502
RUN apk add --no-cache openssl

WORKDIR /server
COPY src/ /server/src
COPY prisma/ /server/prisma
COPY package.json /server
COPY .env.example /server/.env

# Use this is the node modules part is enabled
RUN npm update --force 

# RUN npm install
# RUN npm install --force --loglevel verbose

RUN npx prisma generate
# RUN npx prisma migrate dev --create-only
# RUN npx prisma db push