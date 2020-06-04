const fs = require('fs-extra')
const stringify = require('csv-stringify/lib/sync')
const logger = require('../utilities/logger')
const reporter = require('../utilities/reporter')()

module.exports = ({ source, data, subDefinitionOutput }, outputPath) => {
  const writeFile = (path, data) => {
    logger.debug(`Writing CSV file ${path}`)
    const csvData = Array.isArray(data) ? data : [data]
    const columns = Object.keys(csvData[0]).map((key) => {
      return {
        key,
      }
    })

    fs.outputFile(
      `${outputPath}${path.replace('.{format}', '.csv')}`,
      stringify(csvData, {
        columns,
      })
    )

    logger.debug(`Writing JSON file ${path}`)
    fs.outputJson(`${outputPath}${path.replace('.{format}', '.json')}`, data)
    reporter.addTotal('files')
  }

  if (!data) {
    logger.error(`Source ${path} is missing data`)
    return
  }

  writeFile(source.path, data)

  if (source.subDefinitions) {
    source.subDefinitions.forEach((subDefinition) => {
      if (typeof subDefinitionOutput[subDefinition.key] === 'undefined') {
        return
      }

      subDefinitionOutput[subDefinition.key](
        data,
        subDefinition,
        (path, data) => {
          writeFile(path, data)
        }
      )
    })
  }
}
