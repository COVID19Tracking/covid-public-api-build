const { DateTime } = require('luxon')

module.exports = {
  outputPath: '_api/v1/',
  openApiFrontmatter: {
    openapi: '3.0.0',
    info: {
      title: 'COVID Tracking API Sandbox',
      version: '1.0',
    },
    servers: [
      {
        url: 'https://covidtracking.com',
      },
    ],
  },
  openApiPathPrefix: '/api/v1/',
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
  sources: {
    cdcTests: require('./config/sources/cdc-tests'),
    press: require('./config/sources/press'),
    screenshots: require('./config/sources/screenshots'),
    volunteers: require('./config/sources/volunteers'),
    us: require('./config/sources/us'),
    statesInfo: require('./config/sources/states-info'),
    states: require('./config/sources/states'),
  },
}
