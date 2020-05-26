const { DateTime } = require('luxon')
const regularConfig = require('../../config')

regularConfig.openApiPathPrefix = '/test-api/'
regularConfig.sources.press.worksheetId = 0
regularConfig.sources.cdcTests.worksheetId = 0
regularConfig.sources.raceHomepage.worksheetId = 0
regularConfig.sources.raceCombined.worksheetId = 0
regularConfig.sources.raceSeparate.worksheetId = 0
regularConfig.openApiFrontmatter.openapi = '3.0.0'
regularConfig.sources.us.endpoint = 'https://covidtracking.com/api/_test/us'
regularConfig.sources.statesInfo.endpoint =
  'https://covidtracking.com/api/_test/states/info'
regularConfig.sources.volunteers.listUserField = {
  id: 'list_field',
  value: 'Yes',
}
regularConfig.sources.volunteers.fieldDefinitions.map((field) => {
  if (field.target === 'name') {
    field.source = 'name_field'
  }
  if (field.target === 'website') {
    field.source = 'web_field'
  }
  return field
})

module.exports = regularConfig
