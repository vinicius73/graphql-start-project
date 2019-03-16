const { getConfig } = require('./src/server/utils/config')

const config = getConfig()

module.exports = {
  ...config.services.database,
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    directory: 'knex/migrations',
    tableName: 'knex_migrations'
  }
}
