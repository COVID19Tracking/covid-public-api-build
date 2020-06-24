const fs = require('fs-extra')
const fetch = require('node-fetch')
const ignoredFields = ['notes']
describe('US daily', () => {
  it('has the same fields', async () => {
    const v1 = await fetch(
      'https://covidtracking.com/api/v1/us/daily.json'
    ).then((response) => response.json())
    const v2 = fs.readJsonSync('./_api/v1/us/daily.json')
    expect(v2.length).toBeGreaterThan(v1.length - 5)
    Object.keys(v1[0]).forEach((key) => {
      if (ignoredFields.indexOf(key) === -1) {
        expect(v2[0]).toHaveProperty(key)
      }
    })
  })

  it('created individual US daily files', async () => {
    const v2 = fs.readJsonSync('./_api/v1/us/daily.json')

    v2.forEach((day) => {
      expect(fs.existsSync(`./_api/v1/us/${day.date}.json`)).toBeTruthy()
      expect(fs.existsSync(`./_api/v1/us/${day.date}.csv`)).toBeTruthy()
      const v2 = fs.readJsonSync(`./_api/v1/us/${day.date}.json`)
      Object.keys(day).forEach((key) => {
        if (ignoredFields.indexOf(key) === -1) {
          expect(v2).toHaveProperty(key)
        }
      })
    })
  })
})
