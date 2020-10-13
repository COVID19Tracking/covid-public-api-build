require('jest-fetch-mock').enableMocks()
const config = require('../../__mocks__/config')
const sampleRecords = require('../../__mocks__/sources/us/daily.json')

const usSource = require('../../sources/us')

describe('Sources: US Data', () => {
  it('fetches data', (done) => {
    fetch.mockOnce(JSON.stringify(sampleRecords))
    const { getData } = usSource(config)
    getData().then((result) => {
      expect(result).toHaveLength(5)
      done()
    })
  })

  it('maps fields', () => {
    const { formatData } = usSource(config)

    expect(
      formatData(sampleRecords).find((record) => record.date === 20200519).date
    ).toBe(20200519)
    expect(
      formatData(sampleRecords).find((record) => record.date === 20200520)
        .deathIncrease
    ).toBe(88125 - 86743)
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
