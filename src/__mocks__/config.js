const { DateTime } = require('luxon')
const regularConfig = require('../../config')

regularConfig.openApiPathPrefix = '/test-api/'
regularConfig.sources.statesInfo.worksheetId = 0
regularConfig.sources.us.worksheetId = 0
regularConfig.sources.states.worksheetId = 0
regularConfig.openApiFrontmatter.openapi = '3.0.0'
regularConfig.sources.us.endpoint = 'https://covidtracking.com/api/_test/us'
regularConfig.sources.statesInfo.endpoint =
  'https://covidtracking.com/api/_test/states/info'

module.exports = regularConfig
