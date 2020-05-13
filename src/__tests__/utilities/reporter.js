const reporter = require('../../utilities/reporter')

describe('Utitlities: reporter', () => {
  it('stores and reports values', () => {
    reporter.addLine('Test A')
    reporter.addLine('Test B')
    expect(reporter.get()).toBe(['Test A', 'Test B'].join('\n'))
  })
})
