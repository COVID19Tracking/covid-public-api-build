const logger = require('../utilities/logger')
const fetch = require('node-fetch')
const mapFields = require('../utilities/map-fields')
const hash = require('object-hash')

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
        delete result.hash
        result.hash = hash(result)
        records.push(result)
      }
    })
    return records
  }

  const usDates = (data, definition, writeFile) => {
    data.forEach((row) => {
      writeFile(definition.path.replace('{date}', row.date), row)
    })
  }

  return {
    getData,
    formatData,
    fetch: () => {
      return new Promise((resolve) => {
        logger.info('Fetching US totals from internal API')
        getData().then((data) => {
          resolve({
            source: config.sources.us,
            data: formatData(data),
            subDefinitionOutput: {
              usCurrent: (data, definition, writeFile) => {
                writeFile(definition.path, [data.shift()])
              },
              usDates,
            },
          })
        })
      })
    },
  }
}
