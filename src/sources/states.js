const logger = require('../utilities/logger')
const reporter = require('../utilities/reporter')()
const fetch = require('node-fetch')
const mapFields = require('../utilities/map-fields')
const hash = require('object-hash')

module.exports = (config) => {
  const { endpoint, fieldDefinitions } = config.sources.states

  const getData = () => {
    return fetch(endpoint).then((result) => result.json())
  }

  const formatData = (data) => {
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
    getData,
    formatData,
    statesCurrent,
    statesIndividualCurrent,
    statesIndividualDaily,
    statesIndividualByDate,
    fetch: () => {
      return new Promise((resolve) => {
        logger.info('Fetching state totals from internal API')
        getData().then((data) => {
          reporter.addDataLine('State daily records', data.length)
          resolve({
            source: config.sources.states,
            data: formatData(data),
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
