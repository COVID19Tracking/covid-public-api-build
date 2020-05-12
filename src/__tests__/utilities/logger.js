const logger = require('../../utilities/logger')

describe('Utilities: Logger', () => {
  it('Logs info messages', () => {
    const spy = jest.spyOn(console, 'log')
    logger.info('Test message')
    expect(spy).toHaveBeenCalled()
  })

  it('Logs debug messages', () => {
    process.env.COVID_API_DEBUG = true
    const spy = jest.spyOn(console, 'log')
    logger.debug('Test message')
    expect(spy).toHaveBeenCalled()
  })

  it('Logs success messages', () => {
    const spy = jest.spyOn(console, 'log')
    logger.success('Test message')
    expect(spy).toHaveBeenCalled()
  })

  it('Logs error messages', () => {
    const originalError = console.error
    console.error = jest.fn()
    const spy = jest.spyOn(console, 'error')
    logger.error('Test message')
    expect(spy).toHaveBeenCalled()
    console.error = originalError
  })
})
