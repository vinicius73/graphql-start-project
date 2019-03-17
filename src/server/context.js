const { last, isEmpty } = require('lodash')
const { makeServicesFactoy } = require('../services')
const graphqlQueryCompress = require('graphql-query-compress')
const { generateDataLoaders } = require('../utils/knex-dataloaders')
const resources = require('../resolvers/resources')

const debugRequest = req => {
  let query

  try {
    query = graphqlQueryCompress(req.body.query)
  } catch (e) {
    console.warn(e)
  }

  console.log('request on: %s \n -> %s \n', new Date(), query)
}

/**
 * extract token from request
 *
 * @todo implement auth system
 * @param {request} req
 *
 * @returns {String|Boolean}
 */
const getToken = req => {
  try {
    const header = (req.header('authorization') || req.header('Authorization'))
    const values = (header || '').split(' ')

    const token = last(values)

    return isEmpty(token)
      ? false
      : token
  } catch (e) {
    console.warn(e)
    return false
  }
}

const contextFactory = ({ debug, config }) => {
  const serviceFatory = makeServicesFactoy(config, debug)

  return ({ req }) => {
    debugRequest(req)

    const token = getToken(req)

    const services = serviceFatory(token)

    const context = {
      token,
      debug,
      services,
      dataLoaders: generateDataLoaders(resources, services)
    }

    return Promise.resolve(context)
  }
}

module.exports = { contextFactory }
