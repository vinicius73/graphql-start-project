const loadMutations = require('../utils/load-files/mutations')
const { resolve } = require('path')

module.exports = {
  loadMutations: async () => {
    const RootMutations = await loadMutations(resolve(__dirname, '../mutations'))
    return { RootMutations }
  }
}
