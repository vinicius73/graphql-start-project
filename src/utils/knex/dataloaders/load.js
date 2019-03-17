const { map } = require('lodash')
const { queryFactory } = require('../resources')

const loadData = (resourceConfig, db, id) => {
  const query = queryFactory(db, resourceConfig, { id })
  return query
    .first()
}

const factoryBatchingFunc = (resourceConfig, services) => {
  return ids => {
    const { db } = services
    return Promise.all(
      map(ids, id => loadData(resourceConfig, db, id))
    )
  }
}

module.exports = { loadData, factoryBatchingFunc }
