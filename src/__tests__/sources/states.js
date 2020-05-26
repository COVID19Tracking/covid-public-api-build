require('jest-fetch-mock').enableMocks()
const config = require('../../__mocks__/config')
const sampleRecords = require('../../__mocks__/sources/states/daily.json')

const statesSource = require('../../sources/states')

jest.mock('google-spreadsheet', () => {
  const samples = require('../../__mocks__/sources/states/daily.json')
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
    const { getWorksheetData } = statesSource(config)
    getWorksheetData().then((result) => {
      expect(result).toHaveLength(4)
      done()
    })
  })
  it('maps fields', () => {
    const { formatData } = statesSource(config)

    expect(
      formatData(sampleRecords).find((item) => item.state === 'AS')
        .dataQualityGrade
    ).toBe('D')
    expect(formatData([{ test: 'something' }])).toHaveLength(0)
  })

  it('fetches current values', (done) => {
    const { statesCurrent } = statesSource(config)
    const sampleStates = [
      { state: 'AK', date: 20200503 },
      { state: 'AK', date: 20200504 },
      { state: 'AK', date: 20200501 },
      { state: 'AK', date: 20200502 },
    ]
    statesCurrent(sampleStates, { path: 'test' }, (path, data) => {
      expect(path).toBe('test')
      expect(data.pop().date).toBe(20200504)
      done()
    })
  })

  it('creates individual current values', (done) => {
    const { statesIndividualCurrent } = statesSource(config)
    statesIndividualCurrent(
      [{ state: 'AK', date: 20200501 }],
      { path: 'test/{state}/current.{format}' },
      (path, data) => {
        expect(path).toBe('test/ak/current.{format}')
        expect(data.state).toBe('AK')
        done()
      }
    )
  })

  it('creates individual state current values', (done) => {
    const { statesIndividualCurrent } = statesSource(config)
    statesIndividualCurrent(
      [{ state: 'AK', date: 20200501 }],
      { path: 'test/{state}/current.{format}' },
      (path, data) => {
        expect(path).toBe('test/ak/current.{format}')
        expect(data.state).toBe('AK')
        done()
      }
    )
  })

  it('creates individual state daily values', (done) => {
    const { statesIndividualDaily } = statesSource(config)
    statesIndividualDaily(
      [{ state: 'AK', date: 20200501 }],
      { path: 'test/{state}/daily.{format}' },
      (path, data) => {
        expect(path).toBe('test/ak/daily.{format}')
        expect(data[0].state).toBe('AK')
        done()
      }
    )
  })

  it('creates individual state day files', (done) => {
    const { statesIndividualByDate } = statesSource(config)
    statesIndividualByDate(
      [{ state: 'AK', date: 20200501 }],
      { path: 'test/{state}/{date}.{format}' },
      (path, data) => {
        expect(path).toBe('test/ak/20200501.{format}')
        expect(data.state).toBe('AK')
        done()
      }
    )
  })
})
