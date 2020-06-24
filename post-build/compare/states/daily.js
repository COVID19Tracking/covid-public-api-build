const fs = require('fs-extra')
const fetch = require('node-fetch')
const ignoredFields = ['notes']

describe('States daily', () => {
  it('has the same fields', async () => {
    const v1 = await fetch(
      'https://covidtracking.com/api/v1/states/daily.json'
    ).then((response) => response.json())
    const v2 = fs.readJsonSync('./_api/v1/states/daily.json')
    expect(v2.length).toBeGreaterThan(v1.length - 100)
    Object.keys(v1[0]).forEach((key) => {
      if (ignoredFields.indexOf(key) === -1) {
        expect(v2[0]).toHaveProperty(key)
      }
    })
  })
})
