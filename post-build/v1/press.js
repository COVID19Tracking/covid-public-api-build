const fs = require('fs-extra')
const csv = require('csv-parser')
const checkFile = require('../utilities/check-file')

describe('File : Press', () => {
  it('exists', () => {
    checkFile('_api/v1/internal/press')
  })
})
