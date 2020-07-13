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
      metadata: {
        sheetColumn: 'Date',
      },
    },
    {
      source: 'State',
      target: 'state',
      type: 'string',
      graphQlType: 'String',
      description: 'Two-letter code for the state.',
      nullable: false,
      example: '',
      metadata: {
        sheetColumn: 'State',
      },
    },
    {
      source: 'fips',
      target: 'fips',
      type: 'string',
      graphQlType: 'String',
      description: 'Census FIPS code for the state.',
      nullable: true,
      example: '',
      metadata: {
        internalNote:
          'This is computed from [this static list of FIPS codes](https://github.com/COVID19Tracking/covid-public-api-build/blob/master/config/state-names.js)',
      },
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
      metadata: {
        sheetColumn: 'Positive',
        websiteLabel: 'Cases',
      },
    },

    {
      source: 'positiveIncrease',
      target: 'positiveIncrease',
      type: 'integer',
      graphQlType: 'Int',
      description: 'Daily Difference in positive',
      nullable: true,
      example: '',
      sourceFunction: (item) => 0,
      metadata: {
        sheetColumn: 'Positive',
        internalNote:
          "This field is computed by subtracting the proir date's value for positive from the current date",
      },
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
      metadata: {
        sheetColumn: 'Negative',
        websiteLabel: 'Test: Negative or "negative test results"',
      },
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
      metadata: {
        sheetColumn: 'Negative',
        internalNote:
          "This field is computed by subtracting the proir date's value for negative from the current date",
      },
    },
    {
      source: 'Pending',
      target: 'pending',
      type: 'integer',
      graphQlType: 'Int',
      description: 'Number of tests whose results have yet to be determined.',
      nullable: true,
      example: '',
      metadata: {
        sheetColumn: 'Pending',
      },
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
      metadata: {
        sheetColumn: '"Positive", "Negative" & "Pending"',
        deprecated: true,
        internalNote:
          'This is a deprecated that adds up Positive, Negative, and Pending spreadsheet fields.',
      },
    },
    {
      source: 'totalTestResults',
      target: 'totalTestResults',
      type: 'integer',
      graphQlType: 'Int',
      description: 'Total Test Results Provided by the State',
      nullable: true,
      example: '',
      sourceFunction: (item) =>
        item.positiveCasesViral
          ? item.positiveCasesViral + item.negative
          : item.positive + item.negative,
      metadata: {
        sheetColumn: '"Positive" & "Negative"',
        internalNote: 'Adds up Positive and Negative spreadsheet fields.',
      },
    },
    {
      source: 'totalTestResultsIncrease',
      target: 'totalTestResultsIncrease',
      type: 'integer',
      graphQlType: 'Int',
      description: 'Daily Difference in totalTestResults',
      nullable: true,
      example: '',
      sourceFunction: (item) => 0,
      metadata: {
        sheetColumn: '"Positive" & "Negative"',
        internalNote:
          "This field is computed by subtracting the proir date's value for `totalTestResults` from the current date",
      },
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
      metadata: {
        sheetColumn: '"Positive" & "Negative"',
        deprecated: true,
        internalNote: 'Adds up Positive and Negative spreadsheet fields.',
      },
    },

    {
      source: 'Hospitalized – Currently',
      target: 'hospitalizedCurrently',
      type: 'integer',
      graphQlType: 'Int',
      description: 'Number of people in hospital for COVID-19 on this day.',
      nullable: true,
      example: '',
      metadata: {
        sheetColumn: 'Hospitalized – Currently',
      },
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
      metadata: {
        sheetColumn: 'Hospitalized – Cumulative',
      },
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
      metadata: {
        sheetColumn: 'In ICU – Currently',
      },
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
      metadata: {
        sheetColumn: 'In ICU – Cumulative',
      },
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
      metadata: {
        sheetColumn: 'On Ventilator – Currently',
      },
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
      metadata: {
        sheetColumn: 'On Ventilator – Cumulative',
      },
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
      metadata: {
        sheetColumn: 'Recovered',
      },
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
      metadata: {
        sheetColumn: 'Data Quality Grade',
      },
    },
    {
      source: 'Last Update ET',
      target: 'lastUpdateEt',
      type: 'string',
      graphQlType: 'String',
      description: "Last time the day's data was updated.",
      nullable: true,
      example: '',
      metadata: {
        sheetColumn: 'Last Update ET',
      },
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
      metadata: {
        deprecated: true,
        sheetColumn: 'Last Update ET',
        internalNote:
          'This is a re-formatted value of "Last Update ET" forced into UTC format for historic reasons.',
      },
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
      metadata: {
        deprecated: true,
        sheetColumn: 'Last Update ET',
        internalNote:
          'This is a re-formatted value of "Last Update ET" forced into LL/dd HH:mm America/New_York format for historic reasons.',
      },
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
      metadata: {
        sheetColumn: 'Deaths',
      },
    },
    {
      source: 'deathIncrease',
      target: 'deathIncrease',
      type: 'integer',
      graphQlType: 'Int',
      description: 'Daily difference in death',
      nullable: true,
      example: '',
      sourceFunction: (item) => 0,
      metadata: {
        sheetColumn: 'Deaths',
        internalNote:
          "This field is computed by subtracting the proir date's value for `death` from the current date",
      },
    },
    {
      source: 'Hospitalized – Cumulative',
      target: 'hospitalized',
      type: 'integer',
      graphQlType: 'Int',
      description: 'Deprecated',
      nullable: true,
      example: '',
      metadata: {
        deprecated: true,
        internalNote: 'Old label for `hospitalizedCumulative`.',
      },
    },
    {
      source: 'hospitalizedIncrease',
      target: 'hospitalizedIncrease',
      type: 'integer',
      graphQlType: 'Int',
      description: 'Daily difference in hospitalized',
      nullable: true,
      example: '',
      sourceFunction: (item) => 0,
      metadata: {
        deprecated: true,
        internalNote:
          'An increase compuation for the old label for hospitalized.',
      },
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
      metadata: {
        deprecated: true,
        internalNote: 'This is an old label for "Last Update ET".',
        sheetColumn: 'Last Update ET',
      },
    },
    {
      source: 'hash',
      target: 'hash',
      type: 'string',
      graphQlType: 'String',
      description: 'Deprecated - A hash of the current record.',
      nullable: true,
      example: '',
      sourceFunction: (item) => objectHash(item),
      metadata: {
        deprecated: true,
        internalNote:
          'A hash we provide for consumers so they can invalidate their cache if the values of this row has changed.',
      },
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
      metadata: {
        deprecated: true,
      },
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
      metadata: {
        deprecated: true,
      },
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
      metadata: {
        deprecated: true,
      },
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
      metadata: {
        deprecated: true,
      },
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
      metadata: {
        deprecated: true,
      },
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
      metadata: {
        deprecated: true,
      },
    },
    {
      source: 'Total Tests (PCR)',
      target: 'totalTestsViral',
      type: 'integer',
      graphQlType: 'Int',
      description: 'Total number of PCR tests performed.',
      nullable: true,
      example: '',
      metadata: {
        sheetColumn: 'Total Tests (PCR)',
      },
    },
    {
      source: 'Positive Tests (PCR)',
      target: 'positiveTestsViral',
      type: 'integer',
      graphQlType: 'Int',
      description: 'Total number of positive PCR tests.',
      nullable: true,
      example: '',
      metadata: {
        sheetColumn: 'Positive Tests (PCR)',
      },
    },
    {
      source: 'Negative Tests (PCR)',
      target: 'negativeTestsViral',
      type: 'integer',
      graphQlType: 'Int',
      description: 'Total number of negative PCR tests.',
      nullable: true,
      example: '',
      metadata: {
        sheetColumn: 'Negative Tests (PCR)',
      },
    },
    {
      source: 'Positive Cases (PCR)',
      target: 'positiveCasesViral',
      type: 'integer',
      graphQlType: 'Int',
      description: 'Total number of positive cases measured with PCR tests.',
      nullable: true,
      example: '',
      metadata: {
        sheetColumn: 'Positive Cases (PCR)',
      },
    },
    {
      source: 'Deaths (confirmed)',
      target: 'deathConfirmed',
      type: 'integer',
      graphQlType: 'Int',
      description:
        'Total number deaths of individuals with COVID-19 infection confirmed by a laboratory test. In states where the information is available, it tracks only those laboratory-confirmed deaths where COVID also contributed to the death according to the death certificate.',
      nullable: true,
      example: '',
      metadata: {
        sheetColumn: 'Deaths (confirmed)',
      },
    },
    {
      source: 'Deaths (probable)',
      target: 'deathProbable',
      type: 'integer',
      graphQlType: 'Int',
      description:
        'Total number of deaths where COVID was listed as a cause of death and there is not a laboratory test confirming COVID-19 infection',
      nullable: true,
      example: '',
      metadata: {
        sheetColumn: 'Deaths (probable)',
      },
    },
  ],
}
