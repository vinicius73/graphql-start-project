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

const contextFactory = ({ debug, config }) => {
  return ({ req }) => {
    debugRequest(req)

    return Promise.resolve({
      debug
    })
  }
}

module.exports = { contextFactory }
