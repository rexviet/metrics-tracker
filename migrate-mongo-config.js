require('dotenv').config();
const common = require('@mebx/module-common');
const { merge } = require('lodash');

// load config file with env
const env = process.env.NODE_ENV;
const defaultConf = env ? require(`./dist/src/common/config/default.json`) : {};
const envConf = env ? require(`./dist/src/common/config/${env}.json`) : {};

const config = merge(defaultConf, envConf, process.env);

const dbName = config.mongo.dbName;
const username = config.mongo.dbUser;
const password = config.MONGO_PASSWORD || '';
const dbHosts = config.mongo.hosts;
const mongoUri = common.getMongoUri({
  user: username,
  password,
  dbName,
  hosts: dbHosts,
});

const auth = username
  ? {
      username,
      password,
    }
  : undefined;

const migrationConfig = {
  mongodb: {
    url: mongoUri,

    // TODO Change this to your database name:
    databaseName: dbName,

    options: {
      useUnifiedTopology: true,
      useNewUrlParser: true, // removes a deprecation warning when connecting
      //   connectTimeoutMS: 3600000, // increase connection timeout to 1 hour
      //   socketTimeoutMS: 3600000, // increase socket timeout to 1 hour
      auth,
    },
  },

  // The migrations dir, can be an relative or absolute path. Only edit this when really necessary.
  migrationsDir: `dist/src/migrations`,

  // The mongodb collection where the applied changes are stored. Only edit this when really necessary.
  changelogCollectionName: 'migratelog',
};

//Return the config as a promise
module.exports = migrationConfig;
