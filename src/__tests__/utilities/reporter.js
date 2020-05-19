const reporter = require('../../utilities/reporter')()

const expectedResult = `Test A
Test B


| Item   | Count |
| ------ | ----- |
| Test C | 200   |`

describe('Utitlities: reporter', () => {
  it('stores and reports values', () => {
    reporter.addLine('Test A')
    reporter.addLine('Test B')
    reporter.addDataLine('Test C', 200)
    expect(reporter.get()).toBe(expectedResult)
  })

  it('persists storage', () => {
    const reporter2 = require('../../utilities/reporter')()
    expect(reporter2.get()).toBe(expectedResult)
  })
})
