const fs = require('fs-extra')
const fetch = require('node-fetch')
const ignoredFields = ['notes']

describe('States current', () => {
  it('has the same fields', async () => {
    const v1 = await fetch(
      'https://covidtracking.com/api/v1/states/current.json'
    ).then((response) => response.json())
    const v2 = fs.readJsonSync('./_api/v1/states/current.json')
    expect(v2).toHaveLength(v1.length)
    v1.forEach((state) => {
      const v2State = v2.find((s) => s.state === state.state)
      expect(v2State).toBeDefined()
      Object.keys(state).forEach((key) => {
        if (ignoredFields.indexOf(key) === -1) {
          expect(v2State).toHaveProperty(key)
        }
      })
    })
  })

  it('created state date files', async () => {
    const v1 = await fetch(
      'https://covidtracking.com/api/v1/states/current.json'
    ).then((response) => response.json())
    v1.forEach((state) => {
      expect(
        fs.existsSync(
          `./_api/v1/states/${state.state.toLowerCase()}/current.json`
        )
      ).toBeTruthy()
      expect(
        fs.existsSync(
          `./_api/v1/states/${state.state.toLowerCase()}/current.csv`
        )
      ).toBeTruthy()
      const v2 = fs.readJsonSync(
        `./_api/v1/states/${state.state.toLowerCase()}/current.json`
      )
      Object.keys(state).forEach((key) => {
        if (ignoredFields.indexOf(key) === -1) {
          expect(v2).toHaveProperty(key)
        }
      })
    })
  })
})
