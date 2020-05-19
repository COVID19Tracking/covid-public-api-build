require('jest-fetch-mock').enableMocks()
const fs = require('fs-extra')
const config = require('../../__mocks__/config')
const spec = require('../../__mocks__/spec.json')
const { GoogleSpreadsheet } = require('google-spreadsheet')

const raceHomepageSource = require('../../sources/race-homepage')

const sampleRecord = {
  blackLivesLost: 10,
  blackLivesExpectedMultiplier: 2,
  statesReportingCases: 14,
  statesReportingDeaths: 15,
}

jest.mock('google-spreadsheet', () => ({
  GoogleSpreadsheet: jest.fn(() => ({
    useApiKey: () => {},
    loadInfo: () => {
      return new Promise((resolve) => {
        resolve([])
      })
    },
    sheetsById: [
      {
        getRows: () => {
          return new Promise((resolve) => {
            resolve([
              {
                blackLivesLost: 10,
                blackLivesExpectedMultiplier: 1.9,
                statesReportingCases: 14,
                statesReportingDeaths: 15,
              },
            ])
          })
        },
      },
    ],
  })),
}))

describe('Sources: Racial data tracker homepage', () => {
  it('maps fields', () => {
    const { formatData } = raceHomepageSource(config)

    expect(formatData([sampleRecord]).pop().blackLivesLost).toBe(10)
    expect(formatData([{ test: 'something' }])).toHaveLength(0)
  })

  it('fetches data', (done) => {
    const { fetch } = raceHomepageSource(config)
    fetch().then((response) => {
      expect(response.data).toHaveLength(1)
      expect(response.data.pop().blackLivesExpectedMultiplier).toBe(1.9)
      done()
    })
  })
})
