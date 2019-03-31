const { last, isEmpty } = require('lodash')
const { makeServicesFactoy } = require('../services')
const { generateDataLoaders } = require('../utils/knex/dataloaders')
const graphqlQueryCompress = require('graphql-query-compress')
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

const loadUser = ({ auth, cache }, token) => {
  const loader = () => auth.loadUser(token)
  const key = `token:${token}`
  const options = { ttl: 900 } // 15min

  return cache.wrap(key, loader, options)
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

    if (!token) {
      return Promise.resolve(context)
    }

    return loadUser(services, token)
      .then(user => {
        return Promise.resolve({
          user,
          ...context
        })
      })
  }
}

module.exports = { contextFactory }
