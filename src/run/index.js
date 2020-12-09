const openApi = require('../output/openapi')
const graphQl = require('../output/graphql')
const config = require('../../config')
const v2 = require('./v2')

const api = openApi(config)
const sdl = graphQl(config)
module.exports = (sources, sourceComplete, done) => {
  Promise.all(sources)
    .then((response) => {
      response.forEach((source) => {
        sourceComplete(source)
        api.addSource(source.source)
        sdl.addDefinition(source.source)
      })
    })
    .then(() => {
      return v2()
    })
    .then(() => {
      done(api, sdl)
    })
}
