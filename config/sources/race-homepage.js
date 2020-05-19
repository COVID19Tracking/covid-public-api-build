const { DateTime } = require('luxon')

module.exports = {
  schema: 'Race homepage',
  path: 'internal/race-homepage.{format}',
  tags: ['Internal Endpoints'],
  description: 'Top-line data for the COVID Racial Data Tracker homepage',
  sheetId: '1FnrtpGkm9tuWg8FLavkIHhJSx0Z-X5QJUfbkPhgL3JQ',
  worksheetId: '1451105708',
  fieldDefinitions: [
    {
      source: 'blackLivesLost',
      target: 'blackLivesLost',
      type: 'number',
      graphQlType: 'Int',
      description: 'Number of black lives lost to the coronavirus.',
      nullable: false,
      example: '',
    },
    {
      source: 'blackLivesExpectedMultiplier',
      target: 'blackLivesExpectedMultiplier',
      type: 'number',
      graphQlType: 'Int',
      description: 'Expected lives lost based on population.',
      nullable: false,
    },
    {
      source: 'statesReportingCases',
      target: 'statesReportingCases',
      type: 'number',
      graphQlType: 'Int',
      description:
        'The number of states reporting cases broken down by race or ethnicity.',
      nullable: true,
    },
    {
      source: 'statesReportingDeaths',
      target: 'statesReportingDeaths',
      type: 'number',
      graphQlType: 'Int',
      description:
        'The number of states reporting deaths broken down by race or ethnicity.',
      nullable: false,
    },
  ],
}
