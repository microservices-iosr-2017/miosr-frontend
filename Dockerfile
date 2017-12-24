FROM node:9.3.0-alpine

COPY build/ /webapp/build/
COPY node_modules/ /webapp/node_modules/

ENV NODE_ENV production
ENV SERVER_ROOT /webapp/build/node_modules/server/
ENV CLIENT_ROOT /webapp/build/node_modules/client/

WORKDIR /webapp/
ENTRYPOINT node build/node_modules/server
