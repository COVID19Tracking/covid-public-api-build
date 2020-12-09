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
      ['us-daily'],
      ['states', 'date']
    )
    await fs.outputJson('./_api/v2/us/daily.json', daily)

    daily.data.forEach(async (row) => {
      const dateData = { meta: daily.meta, data: row }
      await fs.outputJson(`./_api/v2/us/daily/${row.date}/index.json`, dateData)
    })

    const simple = await fetch(
      'https://internalapi.covidtracking.com/api/v2/public/us/daily/simple'
    ).then((response) => response.json())
    await fs.outputJson('./_api/v2/us/daily/simple.json', simple)

    simple.data.forEach(async (row) => {
      const dateData = { meta: simple.meta, data: row }
      await fs.outputJson(
        `./_api/v2/us/daily/${row.date}/simple.json`,
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
    await fs.outputJson('./_api/v2/states/daily.json', statesDaily)

    statesDaily.data.forEach(async (row) => {
      const dateData = { meta: statesDaily.meta, data: row }
      await fs.outputJson(
        `./_api/v2/states/daily/${row.state.toLowerCase()}/${
          row.date
        }/index.json`,
        dateData
      )
    })

    const statesDailySimple = await fetch(
      'https://internalapi.covidtracking.com/api/v2/public/states/daily/simple'
    ).then((response) => response.json())
    await fs.outputJson('./_api/v2/states/daily/simple.json', statesDailySimple)

    statesDailySimple.data.forEach(async (row) => {
      const dateData = { meta: statesDailySimple.meta, data: row }
      await fs.outputJson(
        `./_api/v2/states/daily/${row.state.toLowerCase()}/${
          row.date
        }/simple.json`,
        dateData
      )
    })

    const statesInfo = await fetch(
      'https://internalapi.covidtracking.com/api/v2/public/states'
    ).then((response) => response.json())
    statesInfo.meta.field_definitions = endpointFields(['states'], [])
    await fs.outputJson('./_api/v2/states/info.json', statesInfo)

    statesInfo.data.forEach(async (row) => {
      const dateData = { meta: statesInfo.meta, data: row }
      await fs.outputJson(
        `./_api/v2/states/${row.state_code.toLowerCase()}.json`,
        dateData
      )
    })
    resolve()
  })
}
