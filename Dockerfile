FROM node:9.3.0-alpine
COPY build/ /webapp/build/
COPY node_modules/ /webapp/node_modules/
COPY start.sh /webapp/
WORKDIR /webapp/
RUN ./start.sh
