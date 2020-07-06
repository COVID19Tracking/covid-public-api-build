require('jest-fetch-mock').enableMocks()
const fs = require('fs-extra')
const config = require('../../__mocks__/config')
const spec = require('../../__mocks__/spec.json')
const { GoogleSpreadsheet } = require('google-spreadsheet')

const raceHomepageSource = require('../../sources/race-homepage')

const mockSampleRecord = {
  blackLivesLost: 10,
  blackLivesExpectedMultiplier: 2,
  blackPercentOfDeath: 0.2,
  blackPercentOfPopulation: 0.3,
  statesReportingCases: 14,
  statesReportingDeaths: 15,
  blackMortalityRate: 5,
  aianMortalityRate: 5,
  nhpiMortalityRate: 5,
  twoMortalityRate: 5,
  whiteMortalityRate: 5,
  otherMortalityRate: 5,
  latinXMortalityRate: 5,
  blackwhiteRateRatio: 5,
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
            resolve([mockSampleRecord])
          })
        },
      },
    ],
  })),
}))

describe('Sources: Racial data tracker homepage', () => {
  it('maps fields', () => {
    const { formatData } = raceHomepageSource(config)

    expect(formatData([mockSampleRecord]).pop().blackLivesLost).toBe(10)
    expect(formatData([{ test: 'something' }])).toHaveLength(0)
  })

  it('fetches data', (done) => {
    const { fetch } = raceHomepageSource(config)
    fetch().then((response) => {
      expect(response.data).toHaveLength(1)
      expect(response.data.pop().blackLivesExpectedMultiplier).toBe(2)
      done()
    })
  })
})
