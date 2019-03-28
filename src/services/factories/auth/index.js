const { attempt } = require('./login')
const { makeToken } = require('./token')

const factory = ({ db, config }) => {
  return {
    attempt: (email, password) => attempt(db, email, password),
    makeToken: (payload, expiresIn = '3h') => makeToken(config.APP_KEY, payload, expiresIn)
  }
}

module.exports = factory
