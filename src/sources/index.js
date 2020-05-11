const config = require('../../config')

const sources = {
  press: require('./press'),
  screenshots: require('./screenshots'),
  volunteers: require('./volunteers'),
  cdcTests: require('./cdc-tests'),
  us: require('./us'),
  statesInfo: require('./states-info'),
  states: require('./states'),
}

module.exports = (options) => {
  const allSources = []
  if (options.source) {
    allSources.push(sources[options.source](config).fetch())
    return allSources
  }
  Object.keys(sources).forEach((name) => {
    allSources.push(sources[name](config).fetch())
  })
  return allSources
}
