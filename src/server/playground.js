const factoryPlaygroundOptions = config => {
  if (config.NODE_ENV === 'production') {
    return false
  }

  return {
    settings: {
      'editor.theme': 'light'
    }
  }
}

module.exports = { factoryPlaygroundOptions }
