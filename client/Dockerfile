FROM node:alpine
ARG VITE_SERVER_URL=http://127.0.0.1:7999
ENV VITE_SERVER_URL=$VITE_SERVER_URL
RUN apk update && apk add bash
WORKDIR /client
COPY public/ /client/public
COPY src/ /client/src
COPY index.html /client/
COPY package.json /client/
COPY .env.example /client/.env
COPY vite.config.js /client/

# RUN npm install --force --loglevel verbose
RUN npm install
# RUN npm update --force 
RUN npm run build