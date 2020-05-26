const fs = require('fs-extra')

describe('Build was successful', () => {
  it('has a data directory', () => {
    expect(fs.existsSync('_api/v1')).toBeTruthy()
  })
})
