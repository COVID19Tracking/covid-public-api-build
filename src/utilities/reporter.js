const report = []

module.exports = {
  addLine: (message) => {
    report.push(message)
  },

  get: () => {
    return report.join('\n')
  },
}
