module.exports = {
  Users: (root, args, { services }) => {
    const { db } = services

    return db('users')
  }
}
