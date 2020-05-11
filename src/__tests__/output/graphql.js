const graphQl = require('../../output/graphql')
const config = require('../../__mocks__/config')
const sampleSource = require('../../__mocks__/output/schema')

describe('GraphQL output', () => {
  it('adds valid field definitions', () => {
    const spec = graphQl(config)
    expect(() => {
      spec.addDefinition({
        fieldDefinitions: [{ target: 'Wrong', graphQlType: 'WrongType' }],
      })
    }).toThrow()
    expect(() => {
      spec.addDefinition(sampleSource)
    }).not.toThrow()
  })

  it('generates valid Graphql', () => {
    const spec = graphQl(config)
    spec.addDefinition(sampleSource)
    const result = spec.getSdl()
    expect(result.search('Type Test {')).toBeGreaterThan(-1)
    expect(result.search('url: String')).toBeGreaterThan(-1)
    expect(result.search('total: Int')).toBeGreaterThan(-1)
  })
})
