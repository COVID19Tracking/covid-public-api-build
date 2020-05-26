const fs = require('fs-extra')
const csv = require('csv-parser')
const checkFile = require('../../utilities/check-file')

describe('File : States : Daily', () => {
  it('exists', () => {
    checkFile('_api/v1/states/daily')
  })
})
