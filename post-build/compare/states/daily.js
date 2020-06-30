const fs = require('fs-extra')
const fetch = require('node-fetch')
const ignoredFields = ['notes']

expect.extend({
  toMatchField(field, v1, v2) {
    if (field === 'hash') {
      return {
        message: () => `Skipping hash`,
        pass: true,
      }
    }
    if (v1[field] === v2[field] || (!v1[field] && !v2[field])) {
      return {
        message: () =>
          `${field} matches:: State: ${v2.state}, Date: ${v2.date}`,
        pass: true,
      }
    } else {
      return {
        message: () =>
          `${field} does not match:: State: ${v2.state}, Date: ${v2.date}, Current: ${v1[field]} Preview: ${v2[field]} `,
        pass: false,
      }
    }
  },
})

describe('States daily', () => {
  it('has the same fields', async () => {
    const v1 = await fetch(
      'https://covidtracking.com/api/v1/states/daily.json'
    ).then((response) => response.json())
    const v2 = fs.readJsonSync('./_api/v1/states/daily.json')
    expect(v2.length).toBeGreaterThan(v1.length - 100)
    v1.forEach((rowV1) => {
      const rowV2 = v2.find(
        (a) => a.date === rowV1.date && a.state === rowV1.state
      )
      expect(rowV2).toBeTruthy()
      Object.keys(rowV1).forEach((field) => {
        expect(field).toMatchField(rowV1, rowV2)
      })
    })
  })
})
