const commandLineArgs = require('command-line-args')
const fs = require('fs-extra')
const sources = require('./src/sources')
const runner = require('./src/run')
const writer = require('./src/output/files')
const config = require('./config')
require('dotenv').config()

const optionDefinitions = [
  { name: 'source', alias: 's', type: String },
  { name: 'clean', alias: 'c', type: Boolean },
]

const options = commandLineArgs(optionDefinitions)

if (options.clean) {
  fs.removeSync(config.outputPath)
}
fs.ensureDirSync(config.outputPath)

const run = () => {
  runner(
    sources(options),
    (result) => {
      writer(result, config.outputPath)
    },
    (api, graphQl) => {
      fs.writeJsonSync(
        `${config.outputPath}openapi.json`,
        api.getDefinition(),
        {
          spaces: 2,
        }
      )
      fs.writeFileSync(`${config.outputPath}schema.graphql`, graphQl.getSdl())
    }
  )
}

run()
