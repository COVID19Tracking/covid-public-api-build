const git = require('nodegit')

module.exports = () => {
  git.Repository.open('./_api')
    .then((repo) => {
      return repo.getStatus()
    })
    .then((status) => {
      console.log(status.byIndex())
    })
}
