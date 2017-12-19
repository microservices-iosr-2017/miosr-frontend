#!/bin/sh

# this file is copied inside docker image
# expects to be run from /webapp/ directory within container

export NODE_ENV=production
export SERVER_ROOT=/webapp/build/node_modules/server/
export CLIENT_ROOT=/webapp/build/node_modules/client/
node build/node_modules/server
