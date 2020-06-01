const logger = require('../utilities/logger')
const reporter = require('../utilities/reporter')()
const mapFields = require('../utilities/map-fields')
const { GoogleSpreadsheet } = require('google-spreadsheet')

module.exports = (config) => {
  const { sheetId, worksheetId, fieldDefinitions } = config.sources.states

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

  const addIncrease = (data) => {
    let lastItems = {}
    return data
      .sort((a, b) => (a.date > b.date ? 1 : -1))
      .map((row) => {
        if (typeof lastItems[row.state] === 'undefined') {
          lastItems[row.state] = row
          return row
        }
        row.hospitalizedIncrease =
          row.hospitalizedCumulative -
          lastItems[row.state].hospitalizedCumulative
        row.deathIncrease = row.death - lastItems[row.state].death
        row.negativeIncrease = row.negative - lastItems[row.state].negative
        row.positiveIncrease = row.positive - lastItems[row.state].positive
        row.totalTestResultsIncrease =
          row.totalTestResults - lastItems[row.state].totalTestResults

        lastItems[row.state] = row
        return row
      })
  }

  const formatData = (data) => {
    const records = []
    data.forEach((row) => {
      const result = mapFields(fieldDefinitions, row)
      if (result) {
        records.push(result)
      }
    })
    return addIncrease(records)
  }

  const statesCurrent = (data, definition, writeFile) => {
    const states = {}
    data.forEach((state) => {
      if (
        typeof states[state.state] === 'undefined' ||
        states[state.state].date < state.date
      ) {
        states[state.state] = state
      }
    })
    writeFile(definition.path, Object.values(states))
  }

  const statesIndividualCurrent = (data, definition, writeFile) => {
    const states = {}
    data.forEach((state) => {
      if (
        typeof states[state.state] === 'undefined' ||
        states[state.state].date < state.date
      ) {
        states[state.state] = state
      }
    })
    Object.keys(states).forEach((state) => {
      writeFile(
        definition.path.replace('{state}', state.toLowerCase()),
        states[state]
      )
    })
  }

  const statesIndividualDaily = (data, definition, writeFile) => {
    const states = {}
    data.forEach((row) => {
      if (typeof states[row.state] === 'undefined') {
        states[row.state] = []
      }
      states[row.state].push(row)
    })
    Object.keys(states).forEach((state) => {
      writeFile(
        definition.path.replace('{state}', state.toLowerCase()),
        states[state]
      )
    })
  }

  const statesIndividualByDate = (data, definition, writeFile) => {
    const states = {}
    data.forEach((row) => {
      writeFile(
        definition.path
          .replace('{state}', row.state.toLowerCase())
          .replace('{date}', row.date),
        row
      )
    })
  }

  return {
    getWorksheetData,
    formatData,
    statesCurrent,
    addIncrease,
    statesIndividualCurrent,
    statesIndividualDaily,
    statesIndividualByDate,
    fetch: () => {
      return new Promise((resolve) => {
        logger.info('Fetching state totals from sheets')

        client.useApiKey(process.env.GOOGLE_API_KEY)
        getWorksheetData().then((data) => {
          reporter.addDataLine('State daily records', data.length)
          resolve({
            source: config.sources.states,
            data: formatData(data).sort((a, b) => (a.date > b.date ? -1 : 1)),
            subDefinitionOutput: {
              statesCurrent,
              statesIndividualCurrent,
              statesIndividualDaily,
              statesIndividualByDate,
            },
          })
        })
      })
    },
  }
}
