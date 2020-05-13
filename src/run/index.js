const openApi = require('../output/openapi')
const graphQl = require('../output/graphql')
const config = require('../../config')

const api = openApi(config)
const sdl = graphQl(config)
module.exports = (sources, sourceComplete, done) => {
  Promise.all(sources).then((response) => {
    response.forEach((source) => {
      sourceComplete(source)
      api.addSource(source.source)
      sdl.addDefinition(source.source)
    })
    done(api, sdl)
  })
}
