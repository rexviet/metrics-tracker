#!/bin/bash
set -e

cat .env

### Start migrate up
# npm run migrate:up

### Start app
pm2 start ts-node -n api -i 1 --log-date-format 'YYYY-MM-DD HH:mm:ss.SSS' -- -r tsconfig-paths/register src/main.ts
pm2 logs
# /bin/bash

exec "$@"
