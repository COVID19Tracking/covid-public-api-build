const chalk = require('chalk')

const { log, error } = console

module.exports = {
  error: (message) => {
    error(`${chalk.red('Error:')} ${message}`)
  },

  info: (message) => {
    log(`${chalk.blue('Info:')} ${message}`)
  },

  success: (message) => {
    log(`${chalk.green('Success:')} ${message}`)
  },

  debug: (message) => {
    if (process.env.COVID_API_DEBUG) {
      log(`${chalk.cyan('Debug:')} ${message}`)
    }
  },
}
