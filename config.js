const { DateTime } = require('luxon')

module.exports = {
  outputPath: '_api/v1/',
  openApiFrontmatter: {
    openapi: '3.0.0',
    info: {
      title: 'COVID Tracking Project API',
      version: '1.0',
    },
    servers: [
      {
        url: 'https://api.covidtracking.com',
      },
    ],
  },
  openApiPathPrefix: '/v1/',
  openApiBaseParameters: [
    {
      name: 'format',
      in: 'path',
      required: true,
      style: 'simple',
      explode: false,
      schema: {
        type: 'string',
        example: 'json',
      },
      description:
        "Use 'json' to return JSON arrays or object. Use 'csv' to return a CSV file.",
    },
  ],
  bigQuery: {
    dataset: 'covid_api_export',
  },
  sources: {
    press: require('./config/sources/press'),
    screenshots: require('./config/sources/screenshots'),
    volunteers: require('./config/sources/volunteers'),
    us: require('./config/sources/us'),
    raceCombined: require('./config/sources/race-combined'),
    raceSeparate: require('./config/sources/race-separate'),
    raceHomepage: require('./config/sources/race-homepage'),
    statesInfo: require('./config/sources/states-info'),
    states: require('./config/sources/states'),
    status: require('./config/sources/status'),
  },
}
