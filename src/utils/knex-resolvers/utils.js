const { get, upperFirst } = require('lodash')
const { compose } = require('ramda')
const pluralize = require('pluralize')

const parsePagination = raw => {
  const limit = get(raw, ['per_page'], 15)
  const page = get(raw, ['page'], 1)

  return { limit, page }
}

const makeSingleName = compose(upperFirst, pluralize.singular)
const makeListName = compose(upperFirst, pluralize.plural)
const makeResourceName = compose(name => `${name}Resource`, upperFirst, pluralize.plural)

module.exports = { parsePagination, makeSingleName, makeListName, makeResourceName }
