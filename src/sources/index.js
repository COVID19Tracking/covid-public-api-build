const config = require('../../config')

const sources = {
  us: require('./us'),
  statesInfo: require('./states-info'),
  states: require('./states'),
  status: require('./status'),
}

module.exports = (options) => {
  const allSources = []
  if (options.volunteers) {
    sources.volunteers = require('./volunteers')
  }
  if (options.source) {
    allSources.push(sources[options.source](config).fetch())
    return allSources
  }
  Object.keys(sources).forEach((name) => {
    allSources.push(sources[name](config).fetch())
  })
  return allSources
}
