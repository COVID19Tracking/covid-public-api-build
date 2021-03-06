const { DateTime } = require('luxon')
const objectHash = require('object-hash')

const xPublicSourceUrl =
  'https://docs.google.com/spreadsheets/u/2/d/e/2PACX-1vRwAqp96T9sYYq2-i7Tj0pvTf6XVHjDSMIKBdZHXiCGGdNC0ypEU9NbngS8mxea55JuCFuua1MUeOj5/pubhtml#'

module.exports = {
  schema: 'Us',
  formats: ['json', 'csv'],
  path: 'us/daily.{format}',
  tags: ['US Current and Historical Data'],
  summary: 'Historic US values',
  description: 'All COVID data for the US.',
  xPublicSourceUrl,
  endpoint: `https://${process.env.INTERNAL_API_HOST}/api/v1/public/us/daily`,
  subDefinitions: [
    {
      key: 'usCurrent',
      schema: 'Us',
      path: 'us/current.{format}',
      tags: ['US Current and Historical Data'],
      summary: 'Current US values',
      description:
        'The most recent COVID data for the US. The most recent data may not be from today.',
      xPublicSourceUrl,
    },
    {
      key: 'usDates',
      schema: 'Us',
      path: 'us/{date}.{format}',
      tags: ['US Current and Historical Data'],
      summary: 'US historic values for a date',
      description: 'All COVID data for the US on a specific date.',
      xPublicSourceUrl,
      parameters: [
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
    },
    {
      source: 'states',
      target: 'states',
      type: 'integer',
      graphQlType: 'Int',
      description:
        'Number of states and territories included in the US dataset for this day.',
      nullable: false,
      example: 50,
    },
    {
      source: 'positive',
      target: 'positive',
      type: 'integer',
      graphQlType: 'Int',
      description:
        'Individuals with confirmed or probable COVID-19 per the expanded [CSTE case definition](https://cdn.ymaws.com/www.cste.org/resource/resmgr/2020ps/Interim-20-ID-01_COVID-19.pdf) of April 5th, 2020 [approved by the CDC](https://wwwn.cdc.gov/nndss/conditions/coronavirus-disease-2019-covid-19/case-definition/2020/).',
      nullable: true,
      example: 50,
    },

    {
      source: 'negative',
      target: 'negative',
      type: 'integer',
      graphQlType: 'Int',
      description:
        'Individuals with a completed viral test that returned a negative result. For states / territories that do not report this number directly, we compute it using one of several methods, depending on which data points the state provides.',
      nullable: true,
      example: 50,
    },
    {
      source: 'pending',
      target: 'pending',
      type: 'integer',
      graphQlType: 'Int',
      description: 'Tests whose results have not yet been reported.',
      nullable: true,
      example: 50,
    },
    {
      source: 'hospitalizedCurrently',
      target: 'hospitalizedCurrently',
      type: 'integer',
      graphQlType: 'Int',
      description:
        'Individuals who are currently hospitalized with COVID-19. Definitions vary by state / territory. Where possible, we report hospitalizations with confirmed or probable COVID-19 cases per the expanded [CSTE case definition](https://cdn.ymaws.com/www.cste.org/resource/resmgr/2020ps/Interim-20-ID-01_COVID-19.pdf) of April 5th, 2020 [approved by the CDC](https://wwwn.cdc.gov/nndss/conditions/coronavirus-disease-2019-covid-19/case-definition/2020/).',
      nullable: true,
      example: 50,
    },
    {
      source: 'hospitalizedCumulative',
      target: 'hospitalizedCumulative',
      type: 'integer',
      graphQlType: 'Int',
      description:
        'Total number of individuals who have ever been hospitalized with COVID-19.  Definitions vary by state / territory. Where possible, we report hospitalizations with confirmed or probable COVID-19 cases per the expanded [CSTE case definition](https://cdn.ymaws.com/www.cste.org/resource/resmgr/2020ps/Interim-20-ID-01_COVID-19.pdf) of April 5th, 2020 [approved by the CDC](https://wwwn.cdc.gov/nndss/conditions/coronavirus-disease-2019-covid-19/case-definition/2020/).',
      nullable: true,
      example: 50,
    },
    {
      source: 'inIcuCurrently',
      target: 'inIcuCurrently',
      type: 'integer',
      graphQlType: 'Int',
      description:
        'Individuals who are currently hospitalized in the Intensive Care Unit with COVID-19. Definitions vary by state / territory. Where possible, we report patients in the ICU with confirmed or probable COVID-19 cases per the expanded [CSTE case definition](https://cdn.ymaws.com/www.cste.org/resource/resmgr/2020ps/Interim-20-ID-01_COVID-19.pdf) of April 5th, 2020 [approved by the CDC](https://wwwn.cdc.gov/nndss/conditions/coronavirus-disease-2019-covid-19/case-definition/2020/).',
      nullable: true,
      example: 50,
    },
    {
      source: 'inIcuCumulative',
      target: 'inIcuCumulative',
      type: 'integer',
      graphQlType: 'Int',
      description:
        'Total number of individuals who have ever been hospitalized in the Intensive Care Unit with COVID-19. Definitions vary by state / territory. Where possible, we report patients in the ICU with confirmed or probable COVID-19 cases per the expanded [CSTE case definition](https://cdn.ymaws.com/www.cste.org/resource/resmgr/2020ps/Interim-20-ID-01_COVID-19.pdf) of April 5th, 2020 [approved by the CDC](https://wwwn.cdc.gov/nndss/conditions/coronavirus-disease-2019-covid-19/case-definition/2020/).',
      nullable: true,
      example: 50,
    },
    {
      source: 'onVentilatorCurrently',
      target: 'onVentilatorCurrently',
      type: 'integer',
      graphQlType: 'Int',
      description:
        'Individuals who are currently hospitalized under advanced ventilation with COVID-19. Definitions vary by state / territory. Where possible, we report patients on ventilation with confirmed or probable COVID-19 cases per the expanded [CSTE case definition](https://cdn.ymaws.com/www.cste.org/resource/resmgr/2020ps/Interim-20-ID-01_COVID-19.pdf) of April 5th, 2020 [approved by the CDC](https://wwwn.cdc.gov/nndss/conditions/coronavirus-disease-2019-covid-19/case-definition/2020/).',
      nullable: true,
      example: 50,
    },
    {
      source: 'onVentilatorCumulative',
      target: 'onVentilatorCumulative',
      type: 'integer',
      graphQlType: 'Int',
      description:
        'Total number of individuals who have ever been hospitalized under advanced ventilation with COVID-19. Definitions vary by state / territory. Where possible, we report patients on ventilation with confirmed or probable COVID-19 cases per the expanded [CSTE case definition](https://cdn.ymaws.com/www.cste.org/resource/resmgr/2020ps/Interim-20-ID-01_COVID-19.pdf) of April 5th, 2020 [approved by the CDC](https://wwwn.cdc.gov/nndss/conditions/coronavirus-disease-2019-covid-19/case-definition/2020/).',
      nullable: true,
      example: 50,
    },

    {
      source: 'recovered',
      target: 'recovered',
      type: 'integer',
      graphQlType: 'Int',
      description:
        'Deprecated: Individuals who have recovered from COVID-19. Definitions vary by state / territory.',
      nullable: true,
      example: 50,
      sourceFunction: () => null,
    },
    {
      source: 'dateChecked',
      target: 'dateChecked',
      type: 'string',
      graphQlType: 'String',
      description: 'Deprecated. This is an old label for *lastUpdateEt*.',
      nullable: true,
      example: 50,
      format: (date) =>
        DateTime.fromISO(date).setZone('UTC').toFormat(`yyyy-LL-dd'T'TT'Z'`),
    },
    {
      source: 'death',
      target: 'death',
      type: 'integer',
      graphQlType: 'Int',
      description:
        'Total fatalities with confirmed OR probable COVID-19 case diagnosis (per the expanded [CSTE case definition](https://cdn.ymaws.com/www.cste.org/resource/resmgr/2020ps/Interim-20-ID-01_COVID-19.pdf) of April 5th, 2020 [approved by the CDC](https://wwwn.cdc.gov/nndss/conditions/coronavirus-disease-2019-covid-19/case-definition/2020/)). In states where the information is available, it only tracks fatalities with confirmed OR probable COVID-19 case diagnosis where COVID-19 is an underlying cause of death according to the death certificate based on [WHO guidelines](https://www.who.int/classifications/icd/Guidelines_Cause_of_Death_COVID-19.pdf?ua=1).',
      nullable: true,
      example: 50,
    },

    {
      source: 'hospitalizedCumulative',
      target: 'hospitalized',
      type: 'integer',
      graphQlType: 'Int',
      description: 'Deprecated. Old label for hospitalizedCumulative.',
      nullable: true,
      example: 50,
    },
    {
      source: 'total',
      target: 'total',
      type: 'integer',
      graphQlType: 'Int',
      description:
        'Deprecated. Computed by adding *positive*, *negative*, and *pending* values.',
      nullable: true,
      example: 50,
      sourceFunction: () => 0,
    },
    {
      source: 'totalTestResults',
      target: 'totalTestResults',
      type: 'integer',
      graphQlType: 'Int',
      description:
        'Where possible, we report total tests in units of people tested, rather than units of specimens tested. Currently computed by adding positive and negative values because some states do not report totals and to work around different reporting cadences for cases and tests.',
      nullable: true,
      example: 50,
    },
    {
      source: 'posNeg',
      target: 'posNeg',
      type: 'integer',
      graphQlType: 'Int',
      description:
        'Deprecated. Computed by adding *positive* and *negative* values.',
      nullable: true,
      example: 50,
      sourceFunction: () => 0,
    },
    {
      source: 'deathIncrease',
      target: 'deathIncrease',
      type: 'integer',
      graphQlType: 'Int',
      description:
        'Increase in *death* computed by subtracting the value of *death* for the previous day from the value of *death* for the current day.',
      nullable: true,
      example: 50,
      sourceFunction: (item) => 0,
    },
    {
      source: 'hospitalizedIncrease',
      target: 'hospitalizedIncrease',
      type: 'integer',
      graphQlType: 'Int',
      description:
        'Increase in *hospitalizedCumulative* computed by subtracting the value of *hospitalizedCumulative* for the previous day from the value of *hospitalizedCumulative* for the current day.',
      nullable: true,
      example: 50,
      sourceFunction: (item) => 0,
    },
    {
      source: 'negativeIncrease',
      target: 'negativeIncrease',
      type: 'integer',
      graphQlType: 'Int',
      description:
        'Increase in *negative* computed by subtracting the value of *negative* for the previous day from the value for *negative* from the current day.',
      nullable: true,
      example: 50,
      sourceFunction: (item) => 0,
    },
    {
      source: 'positiveIncrease',
      target: 'positiveIncrease',
      type: 'integer',
      graphQlType: 'Int',
      description:
        'Increase in *positive* computed by subtracting the value of *positive* from the previous day from the value of *positive* for the current day.',
      nullable: true,
      example: 50,
      sourceFunction: (item) => 0,
    },
    {
      source: 'totalTestResultsIncrease',
      target: 'totalTestResultsIncrease',
      type: 'integer',
      graphQlType: 'Int',
      description:
        'Deprecated. Increase in *totalTestResults* computed by subtracting the value of *totalTestResults* for the previous day from the value of *totalTestResults* for the current day.',
      nullable: true,
      example: 50,
      sourceFunction: (item) => 0,
    },
    {
      source: 'date',
      target: 'lastModified',
      type: 'string',
      graphQlType: 'String',
      description: 'Deprecated. Old label for lastUpdateET.',
      nullable: false,
      example: '2020-05-27T12:18:23.392Z',
      format: (date) =>
        DateTime.fromISO(date).setZone('UTC').toFormat(`yyyy-LL-dd'T'TT'Z'`),
    },
    {
      source: 'hash',
      target: 'hash',
      type: 'string',
      graphQlType: 'String',
      description: 'A hash for this record',
      nullable: false,
      example: 50,
      sourceFunction: (item) => objectHash(item),
    },
  ],
}
