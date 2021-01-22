const fetch = require('node-fetch')
const fs = require('fs-extra')
const contentful = require('contentful')

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE,
  accessToken: process.env.CONTENTFUL_TOKEN,
})

module.exports = () => {
  return new Promise(async (resolve, reject) => {
    const definitions = await client.getEntries({
      content_type: 'dataDefinition',
    })
    const endpointFields = (types, fields) =>
      definitions.items
        .filter(
          (item) =>
            fields.indexOf(item.fields.v2Name) > -1 ||
            types.indexOf(item.fields.type) > -1
        )
        .map((item) => ({
          name: item.fields.name,
          field: item.fields.v2Name,
          deprecated:
            typeof item.fields.deprecated !== 'undefined'
              ? item.fields.deprecated
              : false,
          prior_names:
            typeof item.fields.priorNames !== 'undefined'
              ? item.fields.priorNames.split(',')
              : [],
        }))

    const daily = await fetch(
      'https://internalapi.covidtracking.com/api/v2/public/us/daily'
    ).then((response) => response.json())
    daily.meta.field_definitions = endpointFields(
      ['states-daily'],
      ['states', 'date']
    )
    await fs.outputJson('./_api/v2beta/us/daily.json', daily)

    daily.data.forEach(async (row) => {
      const dateData = { meta: daily.meta, data: row }
      await fs.outputJson(`./_api/v2beta/us/daily/${row.date}.json`, dateData)
    })

    const simple = await fetch(
      'https://internalapi.covidtracking.com/api/v2/public/us/daily/simple'
    ).then((response) => response.json())
    await fs.outputJson('./_api/v2beta/us/daily/simple.json', simple)

    simple.data.forEach(async (row) => {
      const dateData = { meta: simple.meta, data: row }
      await fs.outputJson(
        `./_api/v2beta/us/daily/${row.date}/simple.json`,
        dateData
      )
    })

    const statesDaily = await fetch(
      'https://internalapi.covidtracking.com/api/v2/public/states/daily'
    ).then((response) => response.json())
    statesDaily.meta.field_definitions = endpointFields(
      ['states-daily'],
      ['date']
    )
    await fs.outputJson('./_api/v2beta/states/daily.json', statesDaily)

    const allStates = {}
    statesDaily.data.forEach((row) => {
      if (typeof allStates[row.state] === 'undefined') {
        allStates[row.state] = []
      }
      allStates[row.state].push(row)
    })

    Object.keys(allStates).forEach(async (key) => {
      const dateData = { meta: statesDaily.meta, data: allStates[key] }
      await fs.outputJson(
        `./_api/v2beta/states/${key.toLowerCase()}/daily.json`,
        dateData
      )
    })

    statesDaily.data.forEach(async (row) => {
      const dateData = { meta: statesDaily.meta, data: row }
      await fs.outputJson(
        `./_api/v2beta/states/${row.state.toLowerCase()}/${row.date}.json`,
        dateData
      )
    })

    const statesDailySimple = await fetch(
      'https://internalapi.covidtracking.com/api/v2/public/states/daily/simple'
    ).then((response) => response.json())
    await fs.outputJson(
      './_api/v2beta/states/daily/simple.json',
      statesDailySimple
    )

    statesDailySimple.data.forEach(async (row) => {
      const dateData = { meta: statesDailySimple.meta, data: row }
      await fs.outputJson(
        `./_api/v2beta/states/${row.state.toLowerCase()}/${
          row.date
        }/simple.json`,
        dateData
      )
    })

    const allStatesSimple = {}
    statesDailySimple.data.forEach((row) => {
      if (typeof allStatesSimple[row.state] === 'undefined') {
        allStatesSimple[row.state] = []
      }
      allStatesSimple[row.state].push(row)
    })

    Object.keys(allStatesSimple).forEach(async (key) => {
      const dateData = {
        meta: statesDailySimple.meta,
        data: allStatesSimple[key],
      }
      await fs.outputJson(
        `./_api/v2beta/states/${key.toLowerCase()}/daily/simple.json`,
        dateData
      )
    })

    const statesInfo = await fetch(
      'https://internalapi.covidtracking.com/api/v2/public/states'
    ).then((response) => response.json())
    statesInfo.meta.field_definitions = endpointFields(['states'], [])
    await fs.outputJson('./_api/v2beta/states.json', statesInfo)

    statesInfo.data.forEach(async (row) => {
      const dateData = { meta: statesInfo.meta, data: row }
      await fs.outputJson(
        `./_api/v2beta/states/${row.state_code.toLowerCase()}.json`,
        dateData
      )
    })
    resolve()
  })
}
