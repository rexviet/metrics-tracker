#!/bin/sh
set -e

cat .env

### Start migrate up
# npm run migrate:up

### Start app
npm start

exec "$@"
