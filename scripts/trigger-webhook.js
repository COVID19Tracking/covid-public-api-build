require('dotenv').config()
const fetch = require('node-fetch')
const fs = require('fs-extra')

const status = fs.readJSONSync('/tmp/covid-build-webhook.json')
if (!status) {
  console.log('Could not find webhook status file')
} else {
  if (status.build) {
    fetch(process.env.SITE_BUILD_WEBHOOK, {
      method: 'post',
      body: '{}',
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
