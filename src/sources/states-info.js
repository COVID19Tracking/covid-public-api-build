const logger = require('../utilities/logger')
const reporter = require('../utilities/reporter')()
const mapFields = require('../utilities/map-fields')
const { GoogleSpreadsheet } = require('google-spreadsheet')

module.exports = (config) => {
  const { sheetId, worksheetId, fieldDefinitions } = config.sources.statesInfo

  const client = new GoogleSpreadsheet(sheetId)

  const getWorksheetData = () => {
    return client
      .loadInfo()
      .then(() => {
        const sheet = client.sheetsById[worksheetId]
        return sheet.getRows()
      })
      .then((rows) => rows)
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
    getWorksheetData,
    formatData,
    statesIndividualInfo,
    fetch: () => {
      return new Promise((resolve) => {
        logger.info('Fetching State info from internal API')

        client.useApiKey(process.env.GOOGLE_API_KEY)
        getWorksheetData().then((data) => {
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
