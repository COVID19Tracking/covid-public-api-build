const fs = require('fs-extra')
const fetch = require('node-fetch')

const ignoredFields = ['notes']
const ignoreFieldValues = ['pum', 'pui']

describe('States info', () => {
  it('has the same fields', async () => {
    const v1 = await fetch(
      'https://covidtracking.com/api/v1/states/info.json'
    ).then((response) => response.json())
    const v2 = fs.readJsonSync('./_api/v1/states/info.json')
    expect(v2).toHaveLength(v2.length)
    Object.keys(v1[0]).forEach((key) => {
      if (ignoredFields.indexOf(key) === -1) {
        expect(v2[0]).toHaveProperty(key)
      }
    })
  })

  it('generated individual state info pages', async () => {
    const v1 = await fetch(
      'https://covidtracking.com/api/v1/states/info.json'
    ).then((response) => response.json())
    v1.forEach((state) => {
      expect(
        fs.existsSync(`./_api/v1/states/${state.state.toLowerCase()}/info.json`)
      ).toBeTruthy()
      expect(
        fs.existsSync(`./_api/v1/states/${state.state.toLowerCase()}/info.csv`)
      ).toBeTruthy()
      const v2 = fs.readJsonSync(
        `./_api/v1/states/${state.state.toLowerCase()}/info.json`
      )
      Object.keys(state).forEach((key) => {
        if (ignoredFields.indexOf(key) === -1) {
          expect(v2).toHaveProperty(key)
        }
      })
    })
  })
})
