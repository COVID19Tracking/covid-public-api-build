require('jest-fetch-mock').enableMocks()
const fs = require('fs-extra')
const config = require('../../__mocks__/config')
const spec = require('../../__mocks__/spec.json')
const { GoogleSpreadsheet } = require('google-spreadsheet')
const sampleRecords = require('../../__mocks__/sources/race-combined/records')

const raceSeparateSource = require('../../sources/race-separate')

jest.mock('google-spreadsheet', () => {
  const sampleRecords = require('../../__mocks__/sources/race-combined/records')
  return {
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
              resolve(sampleRecords)
            })
          },
        },
      ],
    })),
  }
})

describe('Sources: Press', () => {
  it('maps fields', () => {
    const { formatData } = raceSeparateSource(config)

    expect(
      formatData(sampleRecords).find((a) => a.state === 'CA').stateName
    ).toBe('California')
    expect(formatData([{ test: 'something' }])).toHaveLength(0)
  })

  it('fetches data', (done) => {
    const { fetch } = raceSeparateSource(config)
    fetch().then((response) => {
      expect(response.data).toHaveLength(2)
      expect(response.data.find((a) => a.state === 'CA').anyPosData).toBe(true)
      done()
    })
  })
})
