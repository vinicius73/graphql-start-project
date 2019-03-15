const factory = require('debug')

// pm2 support
factory.enable(process.env.DEBUG)

const debug = factory('server')

module.exports = debug
