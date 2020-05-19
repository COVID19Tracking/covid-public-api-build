const logger = require('../utilities/logger')
const reporter = require('../utilities/reporter')
const mapFields = require('../utilities/map-fields')
const { GoogleSpreadsheet } = require('google-spreadsheet')

module.exports = (config) => {
  const { sheetId, worksheetId, fieldDefinitions } = config.sources.raceSeparate

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
    const results = []
    data.forEach((row) => {
      const result = mapFields(fieldDefinitions, row)
      if (result) {
        results.push(result)
      }
    })
    return results
  }

  return {
    formatData,
    fetch: () => {
      return new Promise((resolve, reject) => {
        logger.info(
          'Fetching racial data tracker state information (separated race & ethnicity)'
        )
        client.useApiKey(process.env.GOOGLE_API_KEY)
        getWorksheetData().then((response) => {
          reporter.addDataLine('Race tracker separate', response.length)
          resolve({
            source: config.sources.raceSeparate,
            data: formatData(response),
          })
        })
      })
    },
  }
}
