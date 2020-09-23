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
  description: 'Two-letter abbreviation for the state or territory.',
}

module.exports = {
  schema: 'States',
  path: 'states/daily.{format}',
  tags: ['States Current and Historical Data'],
  endpoint: 'https://internalapi.covidtracking.com/api/v1/public/states/daily',
  summary: 'Historic values for all states',
  description:
    'Lists all COVID data available for every state since tracking started.',
  xPublicSourceUrl,
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
      source: 'date',
      target: 'date',
      type: 'integer',
      graphQlType: 'Int',
      description:
        'Date on which data was collected by The COVID Tracking Project.',
      nullable: false,
      example: 20200501,
      format: (date) =>
        parseInt(DateTime.fromISO(date).toFormat('yyyyLLdd'), 10),
      metadata: {
        sheetColumn: 'Date',
      },
    },
    {
      source: 'state',
      target: 'state',
      type: 'string',
      graphQlType: 'String',
      description: 'Two-letter abbreviation for the state or territory.',
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
      description:
        'Federal Information Processing Standards (FIPS) code for the state or territory.',
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
      source: 'positive',
      target: 'positive',
      type: 'integer',
      graphQlType: 'Int',
      description:
        'Individuals with confirmed or probable COVID-19 per the expanded [CSTE case definition](https://cdn.ymaws.com/www.cste.org/resource/resmgr/2020ps/Interim-20-ID-01_COVID-19.pdf) of April 5th, 2020 [approved by the CDC](https://wwwn.cdc.gov/nndss/conditions/coronavirus-disease-2019-covid-19/case-definition/2020/).',
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
      description:
        'Increase in *positive* computed by subtracting the value of *positive* from the previous day from the value of *positive* for the current day.',
      nullable: true,
      example: '',
      sourceFunction: (item) => 0,
      metadata: {
        sheetColumn: 'Positive',
        internalNote:
          "This field is computed by subtracting the prior date's value for positive from the current date",
      },
    },
    {
      source: 'negative',
      target: 'negative',
      type: 'integer',
      graphQlType: 'Int',
      description:
        'Individuals with a completed viral test that returned a negative result. For states / territories that do not report this number directly, we compute it using one of several methods, depending on which data points the state provides.',
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
          "This field is computed by subtracting the prior date's value for negative from the current date",
      },
    },
    {
      source: 'pending',
      target: 'pending',
      type: 'integer',
      graphQlType: 'Int',
      description: 'Tests whose results have not yet been reported.',
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
          'This is a deprecated field that adds up Positive, Negative, and Pending spreadsheet fields.',
      },
    },
    {
      source: 'totalTestResultsSource',
      target: 'totalTestResultsSource',
      type: 'integer',
      graphQlType: 'Int',
      description:
        'Indicates which field is being used for total test results. If it is posNeg, then it is calculated by adding all positive and negative values.',
      nullable: true,
      example: 'posNeg',
    },
    {
      source: 'totalTestResults',
      target: 'totalTestResults',
      type: 'integer',
      graphQlType: 'Int',
      description:
        'Where possible, we report total tests in units of people tested, rather than units of specimens tested. Currently computed by adding _positive_ and _negative_ values because some states do not report totals and to work around different reporting cadences for cases and tests. ',
      nullable: true,
      example: '',
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
      metadata: {
        sheetColumn: '"Positive" & "Negative"',
        internalNote:
          'Increase in *totalTestResults* computed by subtracting the value of *totalTestResults* for the previous day from the value of *totalTestResults* for the current day.',
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
      source: 'hospitalizedCurrently',
      target: 'hospitalizedCurrently',
      type: 'integer',
      graphQlType: 'Int',
      description:
        'Individuals who are currently hospitalized with COVID-19. Definitions vary by state / territory. Where possible, we report hospitalizations with confirmed or probable COVID-19 cases per the expanded [CSTE case definition](https://cdn.ymaws.com/www.cste.org/resource/resmgr/2020ps/Interim-20-ID-01_COVID-19.pdf) of April 5th, 2020 [approved by the CDC](https://wwwn.cdc.gov/nndss/conditions/coronavirus-disease-2019-covid-19/case-definition/2020/).',
      nullable: true,
      example: '',
      metadata: {
        sheetColumn: 'Hospitalized – Currently',
      },
    },
    {
      source: 'hospitalizedCumulative',
      target: 'hospitalizedCumulative',
      type: 'integer',
      graphQlType: 'Int',
      description:
        'Total number of individuals who have ever been hospitalized with COVID-19.  Definitions vary by state / territory. Where possible, we report hospitalizations with confirmed or probable COVID-19 cases per the expanded [CSTE case definition](https://cdn.ymaws.com/www.cste.org/resource/resmgr/2020ps/Interim-20-ID-01_COVID-19.pdf) of April 5th, 2020 [approved by the CDC](https://wwwn.cdc.gov/nndss/conditions/coronavirus-disease-2019-covid-19/case-definition/2020/).',
      nullable: true,
      example: '',
      metadata: {
        sheetColumn: 'Hospitalized – Cumulative',
      },
    },
    {
      source: 'inIcuCurrently',
      target: 'inIcuCurrently',
      type: 'integer',
      graphQlType: 'Int',
      description:
        'Individuals who are currently hospitalized in the Intensive Care Unit with COVID-19. Definitions vary by state / territory. Where possible, we report patients in the ICU with confirmed or probable COVID-19 cases per the expanded [CSTE case definition](https://cdn.ymaws.com/www.cste.org/resource/resmgr/2020ps/Interim-20-ID-01_COVID-19.pdf) of April 5th, 2020 [approved by the CDC](https://wwwn.cdc.gov/nndss/conditions/coronavirus-disease-2019-covid-19/case-definition/2020/).',
      nullable: true,
      example: '',
      metadata: {
        sheetColumn: 'In ICU – Currently',
      },
    },
    {
      source: 'inIcuCumulative',
      target: 'inIcuCumulative',
      type: 'integer',
      graphQlType: 'Int',
      description:
        'Total number of individuals who have ever been hospitalized in the Intensive Care Unit with COVID-19. Definitions vary by state / territory. Where possible, we report patients in the ICU with confirmed or probable COVID-19 cases per the expanded [CSTE case definition](https://cdn.ymaws.com/www.cste.org/resource/resmgr/2020ps/Interim-20-ID-01_COVID-19.pdf) of April 5th, 2020 [approved by the CDC](https://wwwn.cdc.gov/nndss/conditions/coronavirus-disease-2019-covid-19/case-definition/2020/).',
      nullable: true,
      example: '',
      metadata: {
        sheetColumn: 'In ICU – Cumulative',
      },
    },
    {
      source: 'onVentilatorCurrently',
      target: 'onVentilatorCurrently',
      type: 'integer',
      graphQlType: 'Int',
      description:
        'Individuals who are currently hospitalized under advanced ventilation with COVID-19. Definitions vary by state / territory. Where possible, we report patients on ventilation with confirmed or probable COVID-19 cases per the expanded [CSTE case definition](https://cdn.ymaws.com/www.cste.org/resource/resmgr/2020ps/Interim-20-ID-01_COVID-19.pdf) of April 5th, 2020 [approved by the CDC](https://wwwn.cdc.gov/nndss/conditions/coronavirus-disease-2019-covid-19/case-definition/2020/).',
      nullable: true,
      example: '',
      metadata: {
        sheetColumn: 'On Ventilator – Currently',
      },
    },
    {
      source: 'onVentilatorCumulative',
      target: 'onVentilatorCumulative',
      type: 'integer',
      graphQlType: 'Int',
      description:
        'Total number of individuals who have ever been hospitalized under advanced ventilation with COVID-19. Definitions vary by state / territory. Where possible, we report patients on ventilation with confirmed or probable COVID-19 cases per the expanded [CSTE case definition](https://cdn.ymaws.com/www.cste.org/resource/resmgr/2020ps/Interim-20-ID-01_COVID-19.pdf) of April 5th, 2020 [approved by the CDC](https://wwwn.cdc.gov/nndss/conditions/coronavirus-disease-2019-covid-19/case-definition/2020/).',
      nullable: true,
      example: '',
      metadata: {
        sheetColumn: 'On Ventilator – Cumulative',
      },
    },
    {
      source: 'recovered',
      target: 'recovered',
      type: 'integer',
      graphQlType: 'Int',
      description:
        'Individuals who have recovered from COVID-19. Definitions vary by state / territory.',
      nullable: true,
      example: '',
      metadata: {
        sheetColumn: 'Recovered',
      },
    },
    {
      source: 'dataQualityGrade',
      target: 'dataQualityGrade',
      type: 'string',
      graphQlType: 'String',
      description:
        'The COVID Tracking Project grade of the completeness of the data reporting by a  state.',
      nullable: true,
      example: '',
      metadata: {
        sheetColumn: 'Data Quality Grade',
      },
    },
    {
      source: 'lastUpdateEt',
      target: 'lastUpdateEt',
      type: 'string',
      graphQlType: 'String',
      description:
        'Date and time in Eastern time the state or territory last updated the data.',
      nullable: true,
      example: '',
      metadata: {
        sheetColumn: 'Last Update ET',
      },
    },
    {
      source: 'lastUpdateEt',
      target: 'dateModified',
      type: 'string',
      graphQlType: 'String',
      description: 'Deprecated, use lastUpdateEt instead',
      nullable: true,
      example: '',
      format: (date) =>
        date
          ? DateTime.fromFormat(date, 'M/d/yyyy HH:mm')
              .setZone('UTC', { keepLocalTime: true })
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
      source: 'lastUpdateEt',
      target: 'checkTimeEt',
      type: 'string',
      graphQlType: 'String',
      description: 'Deprecated',
      nullable: true,
      example: '',
      format: (date) =>
        date
          ? DateTime.fromFormat(date, 'M/d/yyyy HH:mm', { zone: 'UTC' })
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
      source: 'death',
      target: 'death',
      type: 'integer',
      graphQlType: 'Int',
      description:
        'Total fatalities with confirmed OR probable COVID-19 case diagnosis (per the expanded [CSTE case definition](https://cdn.ymaws.com/www.cste.org/resource/resmgr/2020ps/Interim-20-ID-01_COVID-19.pdf) of April 5th, 2020 [approved by the CDC](https://wwwn.cdc.gov/nndss/conditions/coronavirus-disease-2019-covid-19/case-definition/2020/)). In states where the information is available, it only tracks fatalities with confirmed OR probable COVID-19 case diagnosis where COVID-19 is an underlying cause of death according to the death certificate based on [WHO guidelines](https://www.who.int/classifications/icd/Guidelines_Cause_of_Death_COVID-19.pdf?ua=1).',
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
          'Increase in *death* computed by subtracting the value of *death* for the previous day from the value of *death* for the current day.',
      },
    },
    {
      source: 'hospitalizedCumulative',
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
          'Increase in *hospitalized* computed by subtracting the value of *hospitalizedCumulative* for the previous day from the value of *hospitalizedCumulative* for the current day.',
      },
    },
    {
      source: 'lastUpdateEt',
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
      source: 'totalTestsViral',
      target: 'totalTestsViral',
      type: 'integer',
      graphQlType: 'Int',
      description: 'Completed viral tests.',
      nullable: true,
      example: '',
      metadata: {
        sheetColumn: 'Total Tests (PCR)',
      },
    },
    {
      source: 'positiveTestsViral',
      target: 'positiveTestsViral',
      type: 'integer',
      graphQlType: 'Int',
      description: 'Completed viral tests that returned positive results.',
      nullable: true,
      example: '',
      metadata: {
        sheetColumn: 'Positive Tests (PCR)',
      },
    },
    {
      source: 'negativeTestsViral',
      target: 'negativeTestsViral',
      type: 'integer',
      graphQlType: 'Int',
      description: 'Completed viral tests that returned negative results.',
      nullable: true,
      example: '',
      metadata: {
        sheetColumn: 'Negative Tests (PCR)',
      },
    },
    {
      source: 'positiveCasesViral',
      target: 'positiveCasesViral',
      type: 'integer',
      graphQlType: 'Int',
      description:
        'Individuals with a completed viral test that returned a positive result.',
      nullable: true,
      example: '',
      metadata: {
        sheetColumn: 'Positive Cases (PCR)',
      },
    },
    {
      source: 'deathConfirmed',
      target: 'deathConfirmed',
      type: 'integer',
      graphQlType: 'Int',
      description:
        'Total fatalities with confirmed COVID-19 case diagnosis (per the expanded [CSTE case definition](https://cdn.ymaws.com/www.cste.org/resource/resmgr/2020ps/Interim-20-ID-01_COVID-19.pdf) of April 5th, 2020 [approved by the CDC](https://wwwn.cdc.gov/nndss/conditions/coronavirus-disease-2019-covid-19/case-definition/2020/)). In states where the information is available, it only tracks fatalities with confirmed COVID-19 case diagnosis where COVID-19 is an underlying cause of death according to the death certificate based on [WHO guidelines](https://www.who.int/classifications/icd/Guidelines_Cause_of_Death_COVID-19.pdf?ua=1).',
      nullable: true,
      example: '',
      metadata: {
        sheetColumn: 'Deaths (confirmed)',
      },
    },
    {
      source: 'deathProbable',
      target: 'deathProbable',
      type: 'integer',
      graphQlType: 'Int',
      description:
        'Total fatalities with probable COVID-19 case diagnosis (per the expanded [CSTE case definition](https://cdn.ymaws.com/www.cste.org/resource/resmgr/2020ps/Interim-20-ID-01_COVID-19.pdf) of April 5th, 2020 [approved by the CDC](https://wwwn.cdc.gov/nndss/conditions/coronavirus-disease-2019-covid-19/case-definition/2020/). In states where the information is available, it only tracks fatalities with probable COVID-19 case diagnosis where COVID-19 is an underlying cause of death according to the death certificate based on [WHO guidelines](https://www.who.int/classifications/icd/Guidelines_Cause_of_Death_COVID-19.pdf?ua=1).',
      nullable: true,
      example: '',
      metadata: {
        sheetColumn: 'Deaths (probable)',
      },
    },
    {
      source: 'totalTestEncountersViral',
      target: 'totalTestEncountersViral',
      type: 'integer',
      graphQlType: 'Int',
      description: '',
      nullable: true,
      example: '',
      metadata: {
        sheetColumn: 'Total Test Encounters (PCR)',
      },
    },
    {
      source: 'totalTestsPeopleViral',
      target: 'totalTestsPeopleViral',
      type: 'integer',
      graphQlType: 'Int',
      description: '',
      nullable: true,
      example: '',
      metadata: {
        sheetColumn: 'Total PCR Tests (People)',
      },
    },
    {
      source: 'totalTestsAntibody',
      target: 'totalTestsAntibody',
      type: 'integer',
      graphQlType: 'Int',
      description: '',
      nullable: true,
      example: '',
      metadata: {
        sheetColumn: 'Total Antibody Tests',
      },
    },
    {
      source: 'positiveTestsAntibody',
      target: 'positiveTestsAntibody',
      type: 'integer',
      graphQlType: 'Int',
      description: '',
      nullable: true,
      example: '',
      metadata: {
        sheetColumn: 'Positive Antibody Tests',
      },
    },
    {
      source: 'negativeTestsAntibody',
      target: 'negativeTestsAntibody',
      type: 'integer',
      graphQlType: 'Int',
      description: '',
      nullable: true,
      example: '',
      metadata: {
        sheetColumn: 'Negative Antibody Tests',
      },
    },
    {
      source: 'totalTestsPeopleAntibody',
      target: 'totalTestsPeopleAntibody',
      type: 'integer',
      graphQlType: 'Int',
      description: '',
      nullable: true,
      example: '',
      metadata: {
        sheetColumn: 'Total Antibody Tests (People)',
      },
    },
    {
      source: 'positiveTestsPeopleAntibody',
      target: 'positiveTestsPeopleAntibody',
      type: 'integer',
      graphQlType: 'Int',
      description: '',
      nullable: true,
      example: '',
      metadata: {
        sheetColumn: 'Positive Antibody Tests (People)',
      },
    },
    {
      source: 'negativeTestsPeopleAntibody',
      target: 'negativeTestsPeopleAntibody',
      type: 'integer',
      graphQlType: 'Int',
      description: '',
      nullable: true,
      example: '',
      metadata: {
        sheetColumn: 'Negative Antibody Tests (People)',
      },
    },
    {
      source: 'totalTestsPeopleAntigen',
      target: 'totalTestsPeopleAntigen',
      type: 'integer',
      graphQlType: 'Int',
      description: '',
      nullable: true,
      example: '',
      metadata: {
        sheetColumn: 'Total Antigen Tests (People)',
      },
    },
    {
      source: 'positiveTestsPeopleAntigen',
      target: 'positiveTestsPeopleAntigen',
      type: 'integer',
      graphQlType: 'Int',
      description: '',
      nullable: true,
      example: '',
      metadata: {
        sheetColumn: 'Positive Antigen Tests (People)',
      },
    },
    {
      source: 'totalTestsAntigen',
      target: 'totalTestsAntigen',
      type: 'integer',
      graphQlType: 'Int',
      description: '',
      nullable: true,
      example: '',
      metadata: {
        sheetColumn: 'Total Antigen Tests',
      },
    },
    {
      source: 'positiveTestsAntigen',
      target: 'positiveTestsAntigen',
      type: 'integer',
      graphQlType: 'Int',
      description: '',
      nullable: true,
      example: '',
      metadata: {
        sheetColumn: 'Positive Antigen Tests',
      },
    },
  ],
}
