<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
docker-compose up
```

## Test

```bash
Because of less time, I did not write any test
```

## API Document
```bash
Go to http://<host>:<port>/api to open Swagger Document.
Default is http://localhost:8082/api 
```

## Design
### 1. Requirement
Build a Metric tracking system that support different Units.
We want to track the following metrics:
Distance (Meter, centimeter, inch, feet, yard)
Temperature (°C, °F, °K)
User should be able to add new metric with: Date, Value, Unit
User should be able get a List of all Metrics base on the type ( Distance / Temperature)
User should be able to get data to draw a chart, which take the latest metric insert for a day, based on the type and specific time period (1 Month, 2 Month)
If User specific a unit when calling the above APIs, it should also convert the value for them.
Note: We dont need authentication, just assume user will pass on an userId and use that to group or query.

### 2. High-level design
We have 3 modules:
- Metric Module: manage out metrics with POST and GET method. This provides APIs for Distance Sensor to add Distance Metrics, Temperature Sensor to add Temperature Metrics, and general API for User to add Distance/Temperature Metrics.
- Metric Chart Module: manage metric data to draw chart. It just store the newest metric in a date, base on Metric Type. We have one API to get metrics to draw chart.
- Shared Module: manage the common resources for the other modules.

### 3. Architect Design
I built a monolith architect, but applying Domain Driven Design and Dependency Injection, it can be splited to microservices easily by spliting module. 

When read the requirement, i thought about IoT domain, so i used MongoDB to store the Metrics because MongoDB has the large read/write capacity, so it's suitable to receive data continuously from the sensors.

I used RabbitMQ as the solution for Capture Data Change (CDC): When a new Metric is added, Metric Module will publish a message to CDC_METRIC topic, and Metric Chart Module has a consumer listen to CHART_CDC_METRIC queue that binded to CDC_METRIC topic, receive the new added Metric and check if it's the newest Metric in date based on type, it will be written to Metric Chart table.
