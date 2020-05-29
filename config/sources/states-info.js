const stateNames = require('../state-names')

module.exports = {
  schema: 'StatesInfo',
  path: 'states/info.{format}',
  tags: ['Additional Endpoints'],
  description: 'States information.',
  endpoint:
    'http://covid-publishing-api-stage.us-east-1.elasticbeanstalk.com/api/v1/public/states/info',
  subDefinitions: [
    {
      key: 'statesIndividualInfo',
      schema: 'StatesInfo',
      path: 'states/{state}/info.{format}',
      tags: ['Additional Endpoints'],
      description: 'The metadata about the specified state',
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
      source: 'state',
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
      source: 'notes',
      target: 'notes',
      type: 'string',
      graphQlType: 'String',
      description: 'Notes about the state',
      nullable: true,
      example: 'This state reports data correctly.',
    },
    {
      source: 'covid19Site',
      target: 'covid19Site',
      type: 'string',
      graphQlType: 'String',
      description: "URL to the state's COVID website",
      nullable: true,
      example: 'http://dhss.alaska.gov/dph/Epi/id/Pages/COVID-19/default.asp',
    },
    {
      source: 'covid19SiteSecondary',
      target: 'covid19SiteSecondary',
      type: 'string',
      graphQlType: 'String',
      description: "URL to the state's secondary COVID website",
      nullable: true,
      example: 'http://dhss.alaska.gov/dph/Epi/id/Pages/COVID-19/default.asp',
    },
    {
      source: 'twitter',
      target: 'twitter',
      type: 'string',
      graphQlType: 'String',
      description: "The state's COVID-related Twitter handle",
      nullable: true,
      example: '@Alaska_DHSS',
    },
    {
      source: 'covid19SiteOld',
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
    },
    {
      source: 'pum',
      target: 'pum',
      type: 'boolean',
      graphQlType: 'Boolean',
      description: 'Deprecated',
      nullable: true,
      example: '',
    },
  ],
}
