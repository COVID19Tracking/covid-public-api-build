require('jest-fetch-mock').enableMocks()
const config = require('../../__mocks__/config')
const sampleRecords = require('../../__mocks__/sources/states-info/info.json')
const { GoogleSpreadsheet } = require('google-spreadsheet')

const statesInfoSource = require('../../sources/states-info')

jest.mock('google-spreadsheet', () => {
  const samples = require('../../__mocks__/sources/states-info/info.json')
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
              resolve(samples)
            })
          },
        },
      ],
    })),
  }
})

describe('Sources: State information', () => {
  it('fetches data', (done) => {
    const { getWorksheetData } = statesInfoSource(config)
    fetch.mockOnce(JSON.stringify(sampleRecords))
    getWorksheetData().then((result) => {
      expect(result).toHaveLength(4)
      done()
    })
  })

  it('maps fields', () => {
    const { formatData } = statesInfoSource(config)

    expect(formatData(sampleRecords).pop().name).toBe('American Samoa')
    expect(formatData([{ test: 'something' }])).toHaveLength(0)
  })

  it('creates individual info pages', (done) => {
    const { formatData, statesIndividualInfo } = statesInfoSource(config)
    const formattedRecords = formatData([sampleRecords[0]])
    statesIndividualInfo(
      formattedRecords,
      { path: 'test/{state}/info.{format}' },
      (path, data) => {
        expect(path).toBe('test/ak/info.{format}')
        expect(data.state).toBe('AK')
        done()
      }
    )
  })
})
