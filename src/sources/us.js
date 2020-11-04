const logger = require('../utilities/logger')
const reporter = require('../utilities/reporter')()
const fetch = require('node-fetch')
const mapFields = require('../utilities/map-fields')

module.exports = (config) => {
  const { endpoint, fieldDefinitions } = config.sources.us

  const getData = () => {
    return fetch(endpoint).then((result) => result.json())
  }

  const formatData = (data, writeFile) => {
    const records = []
    data.forEach((row) => {
      const result = mapFields(fieldDefinitions, row)
      if (result) {
        records.push(result)
      }
    })
    return addIncrease(records)
  }

  const addIncrease = (data) => {
    let lastItem = false
    return data
      .sort((a, b) => (a.date > b.date ? 1 : -1))
      .map((row) => {
        if (!lastItem) {
          lastItem = row
          return row
        }
        row.hospitalizedIncrease = 0
        row.deathIncrease = row.death - lastItem.death
        row.negativeIncrease = row.negative - lastItem.negative
        row.positiveIncrease = row.positive - lastItem.positive
        row.totalTestResultsIncrease =
          row.totalTestResults - lastItem.totalTestResults

        lastItem = row
        return row
      })
  }

  const usDates = (data, definition, writeFile) => {
    data.forEach((row) => {
      writeFile(definition.path.replace('{date}', row.date), row)
    })
  }

  return {
    getData,
    formatData,
    usDates,
    fetch: () => {
      return new Promise((resolve) => {
        logger.info('Fetching US totals from internal API')

        getData().then((data) => {
          reporter.addDataLine('US totals', data.length)
          resolve({
            source: config.sources.us,
            data: formatData(data).sort((a, b) => (a.date > b.date ? -1 : 1)),
            subDefinitionOutput: {
              usDates,
              usCurrent: (data, definition, writeFile) => {
                writeFile(definition.path, [
                  data.sort((a, b) => (a.date < b.date ? 1 : -1))[0],
                ])
              },
            },
          })
        })
      })
    },
  }
}
