const fs = require('fs-extra')
const assert = require('assert')

module.exports = (name) => {
  const suffixes = ['json', 'csv']
  suffixes.forEach((suffix) => {
    assert(
      fs.existsSync(`${name}.${suffix}`),
      `File does not exist: ${name}.${suffix}`
    )
  })
}
