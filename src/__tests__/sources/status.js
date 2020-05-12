const config = require('../../__mocks__/config')

const statusSource = require('../../sources/status')

describe('Sources: API Status', () => {
  it('builds the API status', (done) => {
    const originalCi = process.env.CI
    const status = statusSource(config)
    process.env.CI = true
    status.fetch().then((response) => {
      expect(response.data.production).toBe(true)
      process.env.CI = originalCi
      done()
    })
  })
})
