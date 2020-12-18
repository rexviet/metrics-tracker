#!/bin/sh
set -e

cat .env

### Start migrate up
# npm run migrate:up

### Start app
pm2 start dist/main.js -n api -i 1 --log-date-format 'YYYY-MM-DD HH:mm:ss.SSS'
pm2 logs

exec "$@"
