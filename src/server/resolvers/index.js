const { defaultsDeep } = require('lodash')
const { generateResolvers } = require('../../utils/knex/resolvers')
const { loadMutations } = require('./mutations')
const { loadFields } = require('./fields')

const makeResourceResolvers = () => {
  return generateResolvers(
    require('../../resolvers/resources')
  )
}

module.exports = {
  loadResolvers: async () => {
    const autoResolvers = makeResourceResolvers()
    const [fieldsResolvers, mutationsResolvers] = await Promise.all([
      loadFields(),
      loadMutations()
    ])

    return defaultsDeep(
      {},
      mutationsResolvers,
      autoResolvers,
      fieldsResolvers
    )
  }
}
