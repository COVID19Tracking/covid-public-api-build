const fs = require('fs-extra')
const checkFile = require('../utilities/check-file')

describe('File : Volunteers', () => {
  it('exists', () => {
    checkFile('_api/v1/internal/volunteers')
  })
})
