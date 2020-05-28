const git = require('nodegit')
const fetch = require('node-fetch')

module.exports = () => {
  if (typeof process.env.SITE_BUILD_WEBHOOK === 'undefined') {
    return
  }
  const changedFiles = []
  git.Repository.open('./_api').then((repo) => {
    git.Status.foreach(repo, (file) => {
      if (file.search('status') === -1) {
        changedFiles.push(file)
      }
    })
    if (changedFiles.length) {
      fetch(process.env.SITE_BUILD_WEBHOOK, {
        method: 'post',
        body: '{}',
        headers: { 'Content-Type': 'application/json' },
      })
    }
  })
}
