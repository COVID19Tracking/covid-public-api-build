const config = require('../../config')

const sources = {
  press: require('./press'),
  screenshots: require('./screenshots'),
  volunteers: require('./volunteers'),
  us: require('./us'),
  raceCombined: require('./race-combined'),
  raceSeparate: require('./race-separate'),
  raceHomepage: require('./race-homepage'),
  statesInfo: require('./states-info'),
  states: require('./states'),
  status: require('./status'),
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
