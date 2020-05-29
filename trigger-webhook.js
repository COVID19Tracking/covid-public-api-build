require('dotenv').config()
const git = require('nodegit')
const fetch = require('node-fetch')

const run = () => {
  if (typeof process.env.SITE_BUILD_WEBHOOK === 'undefined') {
    console.log('No webhook set')
    return
  }
  const changedFiles = []
  git.Repository.open('./_api').then((repo) => {
    git.Status.foreach(repo, (file) => {
      if (file.search('status') === -1) {
        changedFiles.push(file)
      }
    }).then((response) => {
      if (changedFiles.length) {
        console.log(`${changedFiles.length} files changed, sending webhook`)
        fetch(process.env.SITE_BUILD_WEBHOOK, {
          method: 'post',
          body: '{}',
          headers: { 'Content-Type': 'application/json' },
        })
      } else {
        console.log('No files changed')
      }
    })
  })
}

run()
