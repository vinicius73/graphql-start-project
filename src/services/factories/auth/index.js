const { attempt } = require('./login')
const { makeToken, loadUser } = require('./token')

const factory = ({ db, config }) => {
  const secret = config.APP_KEY

  return {
    loadUser: token => loadUser(db, secret, token),
    attempt: (email, password) => attempt(db, email, password),
    makeToken: (payload, expiresIn = '3h') => makeToken(secret, payload, expiresIn)
  }
}

module.exports = factory
