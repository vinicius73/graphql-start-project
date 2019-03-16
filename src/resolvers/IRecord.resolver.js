const { cond, T, always, has } = require('ramda')

const getType = cond([
  [has('email'), always('User')],
  [T, always(null)]
])

module.exports = {
  __resolveType: (obj, context, info) => {
    return getType(obj)
  }
}
