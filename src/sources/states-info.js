const logger = require('../utilities/logger')
const reporter = require('../utilities/reporter')()
const mapFields = require('../utilities/map-fields')
const fetch = require('node-fetch')

module.exports = (config) => {
  const { endpoint, fieldDefinitions } = config.sources.statesInfo

  const getData = () => {
    return fetch(endpoint).then((result) => result.json())
  }

  const formatData = (data) => {
    const records = []
    data.forEach((row) => {
      const result = mapFields(fieldDefinitions, row)
      if (result) {
        records.push(result)
      }
    })
    return records.sort((a, b) => (a.state < b.state ? -1 : 1))
  }

  const statesIndividualInfo = (data, definition, writeFile) => {
    data.forEach((row) => {
      writeFile(
        definition.path.replace('{state}', row.state.toLowerCase()),
        row
      )
    })
  }

  return {
    getData,
    formatData,
    statesIndividualInfo,
    fetch: () => {
      return new Promise((resolve) => {
        logger.info('Fetching State info from internal API')

        getData().then((data) => {
          reporter.addDataLine('State info', data.length)
          resolve({
            source: config.sources.statesInfo,
            data: formatData(data),
            subDefinitionOutput: {
              statesIndividualInfo,
            },
          })
        })
      })
    },
  }
}
