require('jest-fetch-mock').enableMocks()
const fs = require('fs-extra')
const config = require('../../__mocks__/config')
const spec = require('../../__mocks__/spec.json')
const { GoogleSpreadsheet } = require('google-spreadsheet')

const cdcTestsSource = require('../../sources/cdc-tests')

const sampleRecord = {
  dateCollected: '4/16',
  cdcLabs: 14,
  usPubHealthLabs: 500,
  dailyTotal: 514,
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
                dateCollected: '4/16',
                cdcLabs: 14,
                usPubHealthLabs: 500,
                dailyTotal: 514,
              },
            ])
          })
        },
      },
    ],
  })),
}))

describe('Sources: CDC tests', () => {
  it('maps fields', () => {
    const { formatData } = cdcTestsSource(config)

    expect(formatData([sampleRecord]).pop().dateCollected).toBe('2020-04-16')
    expect(formatData([{ test: 'something' }])).toHaveLength(0)
  })

  it('fetches data', (done) => {
    const { fetch } = cdcTestsSource(config)
    fetch().then((response) => {
      expect(response.data).toHaveLength(1)
      expect(response.data.pop().dateCollected).toBe('2020-04-16')
      done()
    })
  })
})
