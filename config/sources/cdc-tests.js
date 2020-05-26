const { DateTime } = require('luxon')

module.exports = {
  schema: 'CDCTests',
  path: 'internal/cdc-tests.{format}',
  tags: ['Internal Endpoints'],
  description: "Data on the CDC's public testing initiatives.",
  sheetId: '16gBHQ7dCJK1psqEMasmLKiFlzoNKcfNujVpmHLHldSY',
  worksheetId: 0,
  fieldDefinitions: [
    {
      source: 'dateCollected',
      target: 'dateCollected',
      type: 'string',
      graphQlType: 'Date',
      description: 'Date.',
      nullable: false,
      example: '2020-04-05',
      format: (value) => {
        return DateTime.fromFormat(`${value}/2020`, 'D').toFormat('yyyy-MM-dd')
      },
    },
    {
      source: 'cdcLabs',
      target: 'cdcLabs',
      type: 'number',
      graphQlType: 'Int',
      description: 'Number of tests from CDC labs.',
      nullable: false,
      example: 10,
    },
    {
      source: 'usPubHealthLabs',
      target: 'usPubHealthLabs',
      type: 'number',
      graphQlType: 'Int',
      description: 'Number of tests from public health labs.',
      nullable: false,
      example: 10,
    },
    {
      source: 'dailyTotal',
      target: 'dailyTotal',
      type: 'number',
      graphQlType: 'Int',
      description: 'Number of tests total tests reported by the CDC.',
      nullable: false,
      example: 10,
    },
  ],
}
