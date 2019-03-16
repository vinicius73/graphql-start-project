module.exports = {
  Users: (root, args) => {
    return {
      baseArgs: args,
      __type: 'User'
    }
  },
  User: (root, { id }, { services }) => {
    return services.db('users')
      .where({ id })
      .first()
  }
}
