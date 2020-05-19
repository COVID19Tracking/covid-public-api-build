const logger = require('../utilities/logger')
const mapFields = require('../utilities/map-fields')
const { GoogleSpreadsheet } = require('google-spreadsheet')

module.exports = (config) => {
  const { sheetId, worksheetId, fieldDefinitions } = config.sources.raceHomepage

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
        logger.info('Fetching racial data tracker homepage')
        client.useApiKey(process.env.GOOGLE_API_KEY)
        getWorksheetData().then((response) => {
          resolve({
            source: config.sources.raceHomepage,
            data: formatData(response),
          })
        })
      })
    },
  }
}
