require('jest-fetch-mock').enableMocks()
const config = require('../../__mocks__/config')
const sampleRecords = require('../../__mocks__/sources/states-info/info.json')

const statesInfoSource = require('../../sources/states-info')

describe('Sources: State information', () => {
  it('fetches data', (done) => {
    const { getData } = statesInfoSource(config)
    fetch.mockOnce(JSON.stringify(sampleRecords))
    getData().then((result) => {
      expect(result).toHaveLength(7)
      done()
    })
  })

  it('maps fields', () => {
    const { formatData } = statesInfoSource(config)

    expect(formatData(sampleRecords).pop().name).toBe('Virginia')
    expect(formatData([{ test: 'something' }])).toHaveLength(0)
  })

  it('creates individual info pages', (done) => {
    const { formatData, statesIndividualInfo } = statesInfoSource(config)
    const formattedRecords = formatData([sampleRecords[0]])
    statesIndividualInfo(
      formattedRecords,
      { path: 'test/{state}/info.{format}' },
      (path, data) => {
        expect(path).toBe('test/me/info.{format}')
        expect(data.state).toBe('ME')
        done()
      }
    )
  })
})
