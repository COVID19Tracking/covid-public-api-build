const fs = require('fs-extra')
const { createObjectCsvStringifier } = require('csv-writer')
const logger = require('../utilities/logger')

module.exports = ({ source, data, subDefinitionOutput }, outputPath) => {
  const writeFile = (path, data) => {
    logger.debug(`Writing CSV file ${path}`)
    const csvData = Array.isArray(data) ? data : [data]
    const csvStringifier = createObjectCsvStringifier({
      header: Object.keys(csvData[0]).map((name) => ({
        id: name,
        title: name,
      })),
    })

    fs.outputFile(
      `${outputPath}${path.replace('.{format}', '.csv')}`,
      csvStringifier.getHeaderString() +
        csvStringifier.stringifyRecords(csvData)
    )

    logger.debug(`Writing JSON file ${path}`)
    fs.outputJson(`${outputPath}${path.replace('.{format}', '.json')}`, data)
  }

  if (!data.length) {
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
