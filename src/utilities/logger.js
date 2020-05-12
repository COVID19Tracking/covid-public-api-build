const chalk = require('chalk')

module.exports = {
  error: (message) => {
    console.error(`${chalk.red('Error:')} ${message}`)
  },

  info: (message) => {
    console.log(`${chalk.blue('Info:')} ${message}`)
  },

  success: (message) => {
    console.log(`${chalk.green('Success:')} ${message}`)
  },

  debug: (message) => {
    if (process.env.COVID_API_DEBUG) {
      console.log(`${chalk.cyan('Debug:')} ${message}`)
    }
  },
}
