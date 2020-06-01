const stateNames = require('../state-names')

module.exports = {
  schema: 'StatesInfo',
  path: 'states/info.{format}',
  tags: ['States Current and Historical Data'],
  description: 'State metadata',
  sheetId: '18oVRrHj3c183mHmq3m89_163yuYltLNlOmPerQ18E8w',
  worksheetId: '1983833656',
  subDefinitions: [
    {
      key: 'statesIndividualInfo',
      schema: 'StatesInfo',
      path: 'states/{state}/info.{format}',
      tags: ['States Current and Historical Data'],
      description: 'Metadata about a specific state',
      parameters: [
        {
          name: 'state',
          in: 'path',
          required: true,
          style: 'simple',
          explode: false,
          schema: {
            type: 'string',
            example: 'ca',
          },
          description:
            'Use the two-letter state code to select the current value for a single state.',
        },
      ],
    },
  ],
  fieldDefinitions: [
    {
      source: 'State',
      target: 'state',
      type: 'string',
      graphQlType: 'String',
      description: 'The state postal code',
      nullable: false,
      example: 'CA',
    },
    {
      source: 'name',
      target: 'name',
      type: 'string',
      graphQlType: 'String',
      description: 'The name of the state',
      nullable: false,
      example: 'California',
      sourceFunction: (item) =>
        typeof stateNames[item.state] !== 'undefined'
          ? stateNames[item.state].name
          : 0,
    },
    {
      source: 'fips',
      target: 'fips',
      type: 'string',
      graphQlType: 'String',
      description: 'The census FIPS code',
      nullable: false,
      example: '09',
      sourceFunction: (item) =>
        typeof stateNames[item.state] !== 'undefined'
          ? stateNames[item.state].fips
          : 0,
    },
    {
      source: 'Notes',
      target: 'notes',
      type: 'string',
      graphQlType: 'String',
      description: 'Notes about the state',
      nullable: true,
      example: 'This state reports data correctly.',
    },
    {
      source: 'COVID-19 site',
      target: 'covid19Site',
      type: 'string',
      graphQlType: 'String',
      description: "URL to the state's COVID website",
      nullable: true,
      example: 'http://dhss.alaska.gov/dph/Epi/id/Pages/COVID-19/default.asp',
    },
    {
      source: 'COVID-19 site (secondary)',
      target: 'covid19SiteSecondary',
      type: 'string',
      graphQlType: 'String',
      description: "URL to the state's secondary COVID website",
      nullable: true,
      example: 'http://dhss.alaska.gov/dph/Epi/id/Pages/COVID-19/default.asp',
    },
    {
      source: 'Twitter',
      target: 'twitter',
      type: 'string',
      graphQlType: 'String',
      description: "The state's COVID-related Twitter handle",
      nullable: true,
      example: '@Alaska_DHSS',
    },
    {
      source: 'COVID-19 site (OLD)',
      target: 'covid19SiteOld',
      type: 'string',
      graphQlType: 'String',
      description: "URL to the state's old COVID website",
      nullable: true,
      example: 'http://dhss.alaska.gov/dph/Epi/id/Pages/COVID-19/default.asp',
    },
    {
      source: 'pui',
      target: 'pui',
      type: 'string',
      graphQlType: 'String',
      description: 'Deprecated',
      nullable: true,
      example: '',
      sourceFunction: () => '',
    },
    {
      source: 'pum',
      target: 'pum',
      type: 'boolean',
      graphQlType: 'Boolean',
      description: 'Deprecated',
      nullable: true,
      example: '',
      sourceFunction: () => false,
    },
  ],
}
