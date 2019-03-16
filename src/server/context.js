const { last, isEmpty } = require('lodash')
const services = require('../services')
const graphqlQueryCompress = require('graphql-query-compress')

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

const makeProxyContext = original => {
  return new Proxy(original, {
    get: (target, prop) => {
      return target[prop] || target.services[prop]
    }
  })
}

const contextFactory = ({ debug, config }) => {
  const serviceFatory = services.factory(config, debug)

  return ({ req }) => {
    debugRequest(req)

    const token = getToken(req)

    return Promise.resolve(
      makeProxyContext({
        token,
        debug,
        services: serviceFatory(token)
      })
    )
  }
}

module.exports = { contextFactory }
