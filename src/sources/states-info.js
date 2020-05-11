const logger = require('../utilities/logger')
const fetch = require('node-fetch')
const mapFields = require('../utilities/map-fields')
const hash = require('object-hash')

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
    return records
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
    fetch: () => {
      return new Promise((resolve) => {
        logger.info('Fetching State info from internal API')
        getData().then((data) => {
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
