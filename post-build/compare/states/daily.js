const fs = require('fs-extra')
const fetch = require('node-fetch')
const ignoredFields = ['notes']

describe('States daily', () => {
  it('has the same fields', async () => {
    const v1 = await fetch(
      'https://api.covidtracking.com/v1/states/daily.json'
    ).then((response) => response.json())
    const v2 = fs.readJsonSync('./_api/v1/states/daily.json')
    expect(v2).toHaveLength(v1.length)
    Object.keys(v1[0]).forEach((key) => {
      if (ignoredFields.indexOf(key) === -1) {
        expect(v2[0]).toHaveProperty(key)
      }
    })
  })

  it('created individual state daily files', async () => {
    const v1 = await fetch(
      'https://api.covidtracking.com/v1/states/daily.json'
    ).then((response) => response.json())
    v1.forEach((day) => {
      expect(
        fs.existsSync(
          `./_api/v1/states/${day.state.toLowerCase()}/${day.date}.json`
        )
      ).toBeTruthy()
      expect(
        fs.existsSync(
          `./_api/v1/states/${day.state.toLowerCase()}/${day.date}.csv`
        )
      ).toBeTruthy()
      const v2 = fs.readJsonSync(
        `./_api/v1/states/${day.state.toLowerCase()}/${day.date}.json`
      )
      Object.keys(day).forEach((key) => {
        if (ignoredFields.indexOf(key) === -1) {
          expect(v2).toHaveProperty(key)
        }
      })
    })
  })
})
