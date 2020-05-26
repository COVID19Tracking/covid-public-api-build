const fs = require('fs-extra')
const checkFile = require('../../utilities/check-file')

describe('File : US : All days', () => {
  it('generated a file for every day', async (done) => {
    const days = await fs.readJSON('_api/v1/us/daily.json')
    days.forEach((day) => {
      checkFile(`_api/v1/us/${day.date}`)
    })
    done()
  })
})
