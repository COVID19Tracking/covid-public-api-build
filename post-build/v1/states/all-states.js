const fs = require('fs-extra')
const checkFile = require('../../utilities/check-file')

describe('File : US : All states', () => {
  it('generated files for every state', async (done) => {
    const states = await fs.readJSON('_api/v1/states/info.json')
    states.forEach((state) => {
      checkFile(`_api/v1/states/${state.state.toLowerCase()}/current`)
      checkFile(`_api/v1/states/${state.state.toLowerCase()}/daily`)
      checkFile(`_api/v1/states/${state.state.toLowerCase()}/info`)
    })
    done()
  })
})
