require('dotenv').config()
const git = require('nodegit')
const fs = require('fs-extra')

const run = () => {
  const changedFiles = []
  git.Repository.open('./_api').then((repo) => {
    git.Status.foreach(repo, (file) => {
      if (file.search('status') === -1) {
        changedFiles.push(file)
      }
    })
      .then((response) => {
        if (changedFiles.length) {
          console.log(
            `${changedFiles.length} files changed, setting up webhook to run`
          )
        } else {
          console.log('No files changed')
        }
        fs.writeJsonSync('/tmp/covid-build-webhook.json', {
          build: changedFiles.length > 0,
        })
      })
      .catch((error) => {
        console.log(error)
      })
  })
}

run()
