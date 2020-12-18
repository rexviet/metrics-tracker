FROM node:10.16.0

RUN rm -rf /var/lib/apt/lists/* && apt-get update -y
RUN apt-get install -y telnet vim
RUN npm install -g pm2

WORKDIR /app

COPY src /app/src/
# COPY .env /app/
# COPY .npmrc /app/
COPY package*.json /app/
COPY tsconfig*.json /app/
COPY migrate-mongo-config.js /app/
COPY docker-entrypoint.sh /app/

RUN npm i
RUN npm audit fix --force

RUN npm run build
RUN rm -rf src

# Clear old entrypoint
RUN rm -rf /usr/local/bin/docker-entrypoint.sh
COPY docker-entrypoint.sh /usr/local/bin/
RUN sed -i -e 's/\r$//' /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh && ln -s /usr/local/bin/docker-entrypoint.sh /
ENTRYPOINT ["docker-entrypoint.sh"]

EXPOSE 8080