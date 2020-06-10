const { DateTime } = require('luxon')
const objectHash = require('object-hash')
const stateNames = require('../state-names')

const xPublicSourceUrl =
  'https://docs.google.com/spreadsheets/u/2/d/e/2PACX-1vRwAqp96T9sYYq2-i7Tj0pvTf6XVHjDSMIKBdZHXiCGGdNC0ypEU9NbngS8mxea55JuCFuua1MUeOj5/pubhtml#'

const stateParameter = {
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
    'Use the lower-case two-letter state code to select the current value for a single state.',
}

module.exports = {
  schema: 'States',
  path: 'states/daily.{format}',
  tags: ['States Current and Historical Data'],
  summary: 'Historic values for all states',
  description:
    'Lists all COVID data available for every state since tracking started.',
  xPublicSourceUrl,
  sheetId: '18oVRrHj3c183mHmq3m89_163yuYltLNlOmPerQ18E8w',
  worksheetId: '916628299',
  subDefinitions: [
    {
      key: 'statesCurrent',
      schema: 'States',
      path: 'states/current.{format}',
      tags: ['States Current and Historical Data'],
      summary: 'Current values for all states',
      description:
        'The most recent COVID data for every state. The current value may be different than today.',
      xPublicSourceUrl,
    },
    {
      key: 'statesIndividualCurrent',
      schema: 'States',
      path: 'states/{state}/current.{format}',
      tags: ['States Current and Historical Data'],
      summary: 'Current values for a single state',
      description:
        'The most recent COVID data for a single state. The current value may be different than today. Use lower-case state codes in the URL.',
      xPublicSourceUrl,
      parameters: [stateParameter],
    },
    {
      key: 'statesIndividualDaily',
      schema: 'States',
      path: 'states/{state}/daily.{format}',
      tags: ['States Current and Historical Data'],
      summary: 'Historic values for a single state',
      description:
        'All COVID data for a single state. Use lower-case state codes in the URL.',
      xPublicSourceUrl,
      parameters: [stateParameter],
    },
    {
      key: 'statesIndividualByDate',
      schema: 'States',
      path: 'states/{state}/{date}.{format}',
      tags: ['States Current and Historical Data'],
      summary: 'Values for a single state on a specific date',
      description:
        'All COVID values for a single state on a specific date. Use lower-case state codes in the URL.',
      xPublicSourceUrl,
      parameters: [
        stateParameter,
        {
          name: 'date',
          in: 'path',
          required: true,
          style: 'simple',
          explode: false,
          schema: {
            type: 'string',
            example: '20200501',
          },
          description:
            'Use the ISO-formatted date, without hyphens, to select just the data for a specific date.',
        },
      ],
    },
  ],
  fieldDefinitions: [
    {
      source: 'Date',
      target: 'date',
      type: 'integer',
      graphQlType: 'Int',
      description: 'Date for which the daily totals were collected.',
      nullable: false,
      example: 20200501,
    },
    {
      source: 'State',
      target: 'state',
      type: 'string',
      graphQlType: 'String',
      description: 'Two-letter code for the state.',
      nullable: false,
      example: '',
    },
    {
      source: 'fips',
      target: 'fips',
      type: 'string',
      graphQlType: 'String',
      description: 'Census FIPS code for the state.',
      nullable: true,
      example: '',
      sourceFunction: (item) =>
        typeof stateNames[item.state] !== 'undefined'
          ? stateNames[item.state].fips
          : 0,
    },
    {
      source: 'Positive',
      target: 'positive',
      type: 'integer',
      graphQlType: 'Int',
      description:
        'Total number of people who have tested positive for COVID-19 so far.',
      nullable: true,
      example: '',
    },

    {
      source: 'positiveIncrease',
      target: 'positiveIncrease',
      type: 'integer',
      graphQlType: 'Int',
      description: 'Deprecated',
      nullable: true,
      example: '',
      sourceFunction: (item) => 0,
    },
    {
      source: 'Negative',
      target: 'negative',
      type: 'integer',
      graphQlType: 'Int',
      description:
        'Total number of people who have tested negative for COVID-19 so far.',
      nullable: true,
      example: '',
    },

    {
      source: 'negativeIncrease',
      target: 'negativeIncrease',
      type: 'integer',
      graphQlType: 'Int',
      description: 'Deprecated',
      nullable: true,
      example: '',
      sourceFunction: (item) => 0,
    },
    {
      source: 'Pending',
      target: 'pending',
      type: 'integer',
      graphQlType: 'Int',
      description: 'Number of tests whose results have yet to be determined.',
      nullable: true,
      example: '',
    },
    {
      source: 'total',
      target: 'total',
      type: 'integer',
      graphQlType: 'Int',
      description: 'Deprecated',
      nullable: true,
      example: '',
      sourceFunction: (item) =>
        (item.positive || 0) + (item.negative || 0) + (item.pending || 0),
    },
    {
      source: 'totalTestResults',
      target: 'totalTestResults',
      type: 'integer',
      graphQlType: 'Int',
      description: 'Total Test Results Provided by the State',
      nullable: true,
      example: '',
      sourceFunction: (item) => item.positive + item.negative,
    },
    {
      source: 'totalTestResultsIncrease',
      target: 'totalTestResultsIncrease',
      type: 'integer',
      graphQlType: 'Int',
      description: 'Deprecated',
      nullable: true,
      example: '',
      sourceFunction: (item) => 0,
    },
    {
      source: 'posNeg',
      target: 'posNeg',
      type: 'integer',
      graphQlType: 'Int',
      description: 'Deprecated',
      nullable: true,
      example: '',
      sourceFunction: (item) => item.positive + item.negative,
    },
    {
      source: 'Total Tests (PCR)',
      target: 'totalTestsViral',
      type: 'integer',
      graphQlType: 'Int',
      description: 'Total number of PCR tests performed.',
      nullable: true,
      example: '',
    },
    {
      source: 'Positive Tests (PCR)',
      target: 'positiveTestsViral',
      type: 'integer',
      graphQlType: 'Int',
      description: 'Total number of positive PCR tests.',
      nullable: true,
      example: '',
    },
    {
      source: 'Negative Tests (PCR)',
      target: 'negativeTestsViral',
      type: 'integer',
      graphQlType: 'Int',
      description: 'Total number of negative PCR tests.',
      nullable: true,
      example: '',
    },
    {
      source: 'Positive Cases (PCR)',
      target: 'positiveCasesViral',
      type: 'integer',
      graphQlType: 'Int',
      description: 'Total number of positive cases measured with PCR tests.',
      nullable: true,
      example: '',
    },
    {
      source: 'Hospitalized – Currently',
      target: 'hospitalizedCurrently',
      type: 'integer',
      graphQlType: 'Int',
      description: 'Number of people in hospital for COVID-19 on this day.',
      nullable: true,
      example: '',
    },
    {
      source: 'Hospitalized – Cumulative',
      target: 'hospitalizedCumulative',
      type: 'integer',
      graphQlType: 'Int',
      description:
        'Total number of people who have gone to the hospital for COVID-19 so far, including those who have since recovered or died.',
      nullable: true,
      example: '',
    },
    {
      source: 'In ICU – Currently',
      target: 'inIcuCurrently',
      type: 'integer',
      graphQlType: 'Int',
      description:
        'Total number of people in the ICU for COVID-19 on this day.',
      nullable: true,
      example: '',
    },
    {
      source: 'In ICU – Cumulative',
      target: 'inIcuCumulative',
      type: 'integer',
      graphQlType: 'Int',
      description:
        'Total number of people who have gone to the ICU for COVID-19 so far, including those who have since recovered or died.',
      nullable: true,
      example: '',
    },
    {
      source: 'On Ventilator – Currently',
      target: 'onVentilatorCurrently',
      type: 'integer',
      graphQlType: 'Int',
      description:
        'Number of people using a ventilator for COVID-19 on this day.',
      nullable: true,
      example: '',
    },
    {
      source: 'On Ventilator – Cumulative',
      target: 'onVentilatorCumulative',
      type: 'integer',
      graphQlType: 'Int',
      description:
        'Total number of people who have used a ventilator for COVID-19 so far, including those who have since recovered or died.',
      nullable: true,
      example: '',
    },
    {
      source: 'Recovered',
      target: 'recovered',
      type: 'integer',
      graphQlType: 'Int',
      description:
        'Total number of people who have recovered from COVID-19 so far.',
      nullable: true,
      example: '',
    },
    {
      source: 'Data Quality Grade',
      target: 'dataQualityGrade',
      type: 'string',
      graphQlType: 'String',
      description:
        'Grade assigned to the state based on the quality of their data reporting.',
      nullable: true,
      example: '',
    },
    {
      source: 'Last Update ET',
      target: 'lastUpdateEt',
      type: 'string',
      graphQlType: 'String',
      description: "Last time the day's data was updated.",
      nullable: true,
      example: '',
    },
    {
      source: 'Last Update ET',
      target: 'dateModified',
      type: 'string',
      graphQlType: 'String',
      description: 'Deprecated, use lastUpdateEt instead',
      nullable: true,
      example: '',
      format: (date) =>
        date
          ? DateTime.fromFormat(date, 'M/d/yyyy HH:mm')
              .setZone('UTC')
              .toFormat(`yyyy-LL-dd'T'TT'Z'`)
          : null,
    },
    {
      source: 'Last Update ET',
      target: 'checkTimeEt',
      type: 'string',
      graphQlType: 'String',
      description: 'Deprecated',
      nullable: true,
      example: '',
      format: (date) =>
        date
          ? DateTime.fromFormat(date, 'M/d/yyyy HH:mm')
              .setZone('America/New_York')
              .toFormat(`LL/dd HH:mm`)
          : null,
    },
    {
      source: 'Deaths',
      target: 'death',
      type: 'integer',
      graphQlType: 'Int',
      description:
        'Total number of people who have died as a result of COVID-19 so far.',
      nullable: true,
      example: '',
    },
    {
      source: 'deathIncrease',
      target: 'deathIncrease',
      type: 'integer',
      graphQlType: 'Int',
      description: 'Deprecated',
      nullable: true,
      example: '',
      sourceFunction: (item) => 0,
    },
    {
      source: 'Hospitalized – Cumulative',
      target: 'hospitalized',
      type: 'integer',
      graphQlType: 'Int',
      description: 'Deprecated',
      nullable: true,
      example: '',
    },
    {
      source: 'hospitalizedIncrease',
      target: 'hospitalizedIncrease',
      type: 'integer',
      graphQlType: 'Int',
      description: 'Deprecated',
      nullable: true,
      example: '',
      sourceFunction: (item) => 0,
    },
    {
      source: 'Last Update ET',
      target: 'dateChecked',
      type: 'string',
      graphQlType: 'String',
      description: 'Deprecated',
      nullable: true,
      example: '',
      format: (date) =>
        date
          ? DateTime.fromFormat(date, 'M/d/yyyy HH:mm').toFormat(
              `yyyy-LL-dd'T'TT'Z'`
            )
          : null,
    },
    {
      source: 'hash',
      target: 'hash',
      type: 'string',
      graphQlType: 'String',
      description: 'A hash of the current record.',
      nullable: true,
      example: '',
      sourceFunction: (item) => objectHash(item),
    },
    {
      source: 'commercialScore',
      target: 'commercialScore',
      type: 'integer',
      graphQlType: 'Int',
      description: 'Deprecated',
      nullable: true,
      example: '',
      sourceFunction: () => 0,
    },
    {
      source: 'negativeRegularScore',
      target: 'negativeRegularScore',
      type: 'integer',
      graphQlType: 'Int',
      description: 'Deprecated',
      nullable: true,
      example: '',
      sourceFunction: () => 0,
    },
    {
      source: 'negativeScore',
      target: 'negativeScore',
      type: 'integer',
      graphQlType: 'Int',
      description: 'Deprecated',
      nullable: true,
      example: '',
      sourceFunction: () => 0,
    },
    {
      source: 'positiveScore',
      target: 'positiveScore',
      type: 'integer',
      graphQlType: 'Int',
      description: 'Deprecated',
      nullable: true,
      example: '',
      sourceFunction: () => 0,
    },
    {
      source: 'score',
      target: 'score',
      type: 'integer',
      graphQlType: 'Int',
      description: 'Deprecated',
      nullable: true,
      example: '',
      sourceFunction: () => 0,
    },
    {
      source: 'grade',
      target: 'grade',
      type: 'string',
      graphQlType: 'String',
      description: 'Deprecated',
      nullable: true,
      example: '',
      sourceFunction: () => '',
    },
  ],
}
