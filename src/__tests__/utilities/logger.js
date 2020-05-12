const logger = require('../../utilities/logger')
const mockConsole = require('jest-mock-console')

describe('Utilities: Logger', () => {
  it('Logs info messages', () => {
    process.stdout = mockConsole
    logger.info('Test message')
    expect(console.log).toHaveBeenCalled()
  })
})
