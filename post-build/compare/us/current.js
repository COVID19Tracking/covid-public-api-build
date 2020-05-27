const fs = require('fs-extra')
const fetch = require('node-fetch')
const ignoredFields = ['notes']
describe('US current', () => {
  it('has the same fields', async () => {
    const v1 = await fetch(
      'https://covidtracking.com/api/v1/us/current.json'
    ).then((response) => response.json())
    const v2 = fs.readJsonSync('./_api/v1/us/current.json')
    expect(v2).toHaveLength(1)
    Object.keys(v1[0]).forEach((key) => {
      if (ignoredFields.indexOf(key) === -1) {
        expect(v2[0]).toHaveProperty(key)
      }
    })
  })
})
