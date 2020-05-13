const logger = require('../utilities/logger')
const reporter = require('../utilities/reporter')()
const mapFields = require('../utilities/map-fields')
const { GoogleSpreadsheet } = require('google-spreadsheet')

module.exports = (config) => {
  const { sheetId, sheetIndex, fieldDefinitions } = config.sources.press

  const client = new GoogleSpreadsheet(sheetId)

  const getWorksheetData = () => {
    return client
      .loadInfo()
      .then(() => {
        const sheet = client.sheetsByIndex[sheetIndex]
        return sheet.getRows()
      })
      .then((rows) => rows)
  }

  const formatData = (data) => {
    const articles = []
    data.forEach((row) => {
      const result = mapFields(fieldDefinitions, row)
      if (result) {
        articles.push(result)
      }
    })
    return articles
  }

  return {
    formatData,
    fetch: () => {
      return new Promise((resolve, reject) => {
        logger.info('Fetching press')
        client.useApiKey(process.env.GOOGLE_API_KEY)
        getWorksheetData().then((response) => {
          reporter.addDataLine('Press articles', response.length)
          resolve({
            source: config.sources.press,
            data: formatData(response),
          })
        })
      })
    },
  }
}
