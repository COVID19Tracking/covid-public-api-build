const graphQl = require('../output/graphql')
const config = require('../../config')

describe('Production configuration', () => {
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
