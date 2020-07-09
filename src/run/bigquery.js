const logger = require('../utilities/logger')
const reporter = require('../utilities/reporter')()
const { BigQuery } = require('@google-cloud/bigquery')
const fs = require('fs-extra')

const credentials = JSON.parse(process.env.BIGQUERY_CREDENTIALS)
const client = new BigQuery({
  projectId: credentials.project_id,
  credentials,
  scopes: ['https://www.googleapis.com/auth/drive'],
})

module.exports = async (config, done) => {
  const [tables] = await client.dataset(config.bigQuery.dataset).getTables()
  const queue = []
  tables.forEach((table) => {
    queue.push(
      new Promise(async (resolve, reject) => {
        const query = `SELECT * FROM \`${config.bigQuery.dataset}.${table.id}\``
        const [job] = await client.createQueryJob({
          query,
          location: 'US',
        })
        const [rows] = await job.getQueryResults()
        logger.debug(`Fetched ${rows.length} rows from bigquery ${table.id}`)

        fs.outputJson(
          `${config.outputPath}internal/bigquery/${table.id}.json`,
          rows
        )
        resolve(table.id)
      })
    )
  })
  Promise.all(queue).then((result) => {
    done(result)
  })
}
