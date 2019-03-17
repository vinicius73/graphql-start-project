const { map } = require('lodash')

const normalizeResources = tables => {
  return map(tables, row => {
    return {
      ...row,
      resource: row.resource || row.table,
      applyWhere: row.applyWhere || {}
    }
  })
}

module.exports = { normalizeResources }
