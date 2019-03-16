const { get } = require('lodash')
const knex = require('knex')

const factory = ({ config }) => {
  const options = get(config, ['services', 'database'])

  return knex({
    ...options
  })
}

module.exports = factory
