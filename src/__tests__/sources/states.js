require('jest-fetch-mock').enableMocks()
const config = require('../../__mocks__/config')
const sampleRecords = require('../../__mocks__/sources/states/daily.json')

const statesSource = require('../../sources/states')

describe('Sources: US Data', () => {
  it('fetches data', (done) => {
    fetchMock.mockOnce(JSON.stringify(sampleRecords))
    const { getData } = statesSource(config)
    getData().then((result) => {
      expect(result).toHaveLength(4)
      done()
    })
  })
  it('maps fields', () => {
    const { formatData } = statesSource(config)

    expect(formatData(sampleRecords).pop().dataQualityGrade).toBe('D')
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
})
