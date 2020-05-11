const openApi = require('../output/openapi')
const graphQl = require('../output/graphql')
const oasNormalize = require('oas-normalize')
const config = require('../../config')

describe('Production configuration', () => {
  it('generates a valid OpenAPI definition', (done) => {
    const api = openApi(config)
    Object.keys(config.sources).forEach((source) => {
      api.addSource(config.sources[source])
    })

    const spec = new oasNormalize(api.getDefinition())
    spec.validate((error) => {
      expect(error).toBeNull()
      done()
    })
  })

  it('generates a valid GraphQL schema', () => {
    const spec = graphQl(config)
    expect(() => {
      Object.keys(config.sources).forEach((source) => {
        spec.addDefinition(config.sources[source])
      })
      const result = spec.getSdl()
    }).not.toThrow()
  })
})
