const { serverFactory } = require('./server')

serverFactory()
  .then(() => {
    console.log('✔️   All done')
  })
  .catch(e => {
    console.error('⛔', e.message)
  })
