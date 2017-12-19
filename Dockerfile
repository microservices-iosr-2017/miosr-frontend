FROM node:9.3.0-alpine

COPY build/ /webapp/build/
COPY node_modules/ /webapp/node_modules/
COPY start.sh /webapp/

ENV NODE_ENV production
ENV SERVER_ROOT /webapp/build/node_modules/server/
ENV CLIENT_ROOT /webapp/build/node_modules/client/

WORKDIR /webapp/
RUN node build/node_modules/server
