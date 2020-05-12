const { DateTime } = require('luxon')

module.exports = (config) => {
  const getStatus = () => ({
    buildTime: DateTime.fromObject({ zone: 'UTC' }).toISO(),
    production: process.env.CI ? true : false,
    runNumber: process.env.GITHUB_RUN_NUMBER
      ? process.env.GITHUB_RUN_NUMBER
      : 0,
  })

  return {
    fetch: () => {
      return new Promise((resolve) => {
        resolve({
          source: config.sources.status,
          data: getStatus(),
        })
      })
    },
  }
}
