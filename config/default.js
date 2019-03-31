const path = require('path')

const envConfig = require('dotenv').config()

for (var k in envConfig) {
  process.env[k] = envConfig[k]
}

module.exports = {
  SERVER_NAME: 'GraphQL Demo',
  SERVER_BASE_DIR: path.join(__dirname, '../src'),
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  APP_KEY: process.env.APP_KEY || 'no key',
  services: {
    database: {
      client: 'pg',
      connection: {
        host: process.env.DB_HOST || 'portgres',
        database: process.env.DB_NAME || 'demo',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
      }
    },
    redis: {
      host: process.env.REDIS_HOST || 'redis',
      port: process.env.REDIS_PORT || 6379,
      // auth_pass: process.env.REDIS_AUTH_PASS || undefined,
      db: process.env.REDIS_DB || 0,
      ttl: 600
    }
  },
  env: {
    DEBUG_COLORS: true
  }
}
