const { first, divide } = require('lodash')

module.exports = {
  pagination: ({ baseArgs }, args, { services }) => {
    const pagination = baseArgs.pagination || {}
    const limit = pagination.per_page || 25
    const page = pagination.page || 0

    const base = {
      per_page: limit,
      current_page: page
    }

    return services.db('users')
      .count('* as count')
      .then(result => first(result))
      .then(({ count }) => {
        const pages = divide(count, limit)

        return {
          ...base,
          total_pages: Math.ceil(pages),
          total_records: count
        }
      })
  },
  records: ({ baseArgs }, args, { services }) => {
    const pagination = baseArgs.pagination

    const query = services.db('users')

    if (pagination) {
      const limit = pagination.per_page || 25
      const page = pagination.page || 1

      query.limit(limit)
        .offset(limit * (page - 1))
    }

    return query
  }
}
