require('jest-fetch-mock').enableMocks()
const config = require('../../__mocks__/config')
const sampleRecords = require('../../__mocks__/sources/states-info/info.json')

const statesInfoSource = require('../../sources/states-info')

describe('Sources: State information', () => {
  it('fetches data', (done) => {
    const { getData } = statesInfoSource(config)
    fetch.mockOnce(JSON.stringify(sampleRecords))
    getData().then((result) => {
      expect(result).toHaveLength(4)
      done()
    })
  })

  it('maps fields', () => {
    const { formatData } = statesInfoSource(config)

    expect(formatData(sampleRecords).pop().name).toBe('American Samoa')
    expect(formatData([{ test: 'something' }])).toHaveLength(0)
  })
})
