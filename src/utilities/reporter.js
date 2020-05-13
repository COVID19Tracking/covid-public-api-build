const markdownTable = require('markdown-table')
const { IncomingWebhook } = require('@slack/webhook')

const webhook =
  typeof process.env.SLACK_WEBHOOK !== 'undefined'
    ? new IncomingWebhook(process.env.SLACK_WEBHOOK)
    : false
const lines = []
const dataLines = [['Item', 'Count']]
const totals = {}

module.exports = () => {
  const get = () => {
    const result = [...lines]
    result.push('\n')
    result.push(markdownTable(dataLines))
    return result.join('\n')
  }

  const addTotal = (key, add = 1) => {
    if (typeof totals[key] === 'undefined') {
      totals[key] = 0
    }
    totals[key] += add
  }

  const getTotal = (key) => {
    if (typeof totals[key] !== 'undefined') {
      return totals[key]
    }
    return 0
  }

  const addLine = (message) => {
    lines.push(message)
  }

  const addDataLine = (message, count) => {
    dataLines.push([message, count])
  }

  const report = () => {
    console.log(get())
    if (webhook) {
      webhook.send({
        text: `\`\`\`${get()}\`\`\``,
      })
    }
  }

  const fail = (message) => {
    console.log(`Build failed ${message}`)
    if (webhook) {
      webhook.send({
        text: `Build failed ${message}`,
      })
    }
  }

  return {
    addTotal,
    addLine,
    addDataLine,
    getTotal,
    get,
    report,
    fail,
  }
}
