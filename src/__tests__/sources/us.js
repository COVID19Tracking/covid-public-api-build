require('jest-fetch-mock').enableMocks()
const config = require('../../__mocks__/config')
const sampleRecords = require('../../__mocks__/sources/us/daily.json')

const usSource = require('../../sources/us')

jest.mock('google-spreadsheet', () => {
  const samples = require('../../__mocks__/sources/us/daily.json')
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

describe('Sources: US Data', () => {
  it('fetches data', (done) => {
    fetchMock.mockOnce(JSON.stringify(sampleRecords))
    const { getWorksheetData } = usSource(config)
    getWorksheetData().then((result) => {
      expect(result).toHaveLength(3)
      done()
    })
  })

  it('maps fields', () => {
    const { formatData } = usSource(config)

    expect(formatData(sampleRecords).pop().date).toBe(20200509)
    expect(formatData([{ test: 'something' }])).toHaveLength(0)
  })

  it('creates individual date files', (done) => {
    const { usDates } = usSource(config)
    usDates(
      [{ date: 20200501, positive: 12 }],
      { path: 'test/us/{date}.{format}' },
      (path, data) => {
        expect(path).toBe('test/us/20200501.{format}')
        expect(data.positive).toBe(12)
        done()
      }
    )
  })
})
