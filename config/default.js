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

  },
  env: {
    DEBUG_COLORS: true
  }
}
