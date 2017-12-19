FROM node:9.3.0-alpine
COPY build/ /webapp/build/
COPY node_modules/ /webapp/node_modules/
RUN cd /webapp/ && node build/node_modules/server
