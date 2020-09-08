require('jest-fetch-mock').enableMocks()
const fs = require('fs-extra')
const config = require('../../__mocks__/config')
const spec = require('../../__mocks__/spec.json')
const { GoogleSpreadsheet } = require('google-spreadsheet')
const sampleRecords = require('../../__mocks__/sources/race-combined/records')

const raceCombinedSource = require('../../sources/race-combined')

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

describe('Sources: Race combined', () => {
  it('maps fields', () => {
    const { formatData } = raceCombinedSource(config)

    expect(
      formatData(sampleRecords).find((a) => a.state === 'CA').stateName
    ).toBe('California')
    expect(formatData([{ test: 'something' }])).toHaveLength(0)
  })

  it('fetches data', (done) => {
    const { fetch } = raceCombinedSource(config)
    fetch().then((response) => {
      expect(response.data).toHaveLength(2)
      expect(response.data.find((a) => a.state === 'CA').anyPosData).toBe(true)
      done()
    })
  })
})
