const openApi = require('../../output/openapi')
const config = require('../../__mocks__/config')
const sampleSource = require('../../__mocks__/output/schema')

describe('OpenAPI builder', () => {
  it('processes a source path', () => {
    const api = openApi(config)
    const path = api.processSourcePath(sampleSource)
    expect(path.get.responses['200'].content).toHaveProperty('application/json')
    expect(path.get.responses['200'].content).toHaveProperty('text/csv')
  })

  it('processes a source schema', () => {
    const api = openApi(config)
    const schema = api.processSourceSchema(sampleSource)

    expect(schema.properties.url).toHaveProperty('description')
  })

  it('adds sub-definitions', () => {
    const api = openApi(config)
    api.addSource(sampleSource)
    const spec = api.getDefinition()
    expect(spec.paths['/test-api/v1/test2.{format}']).not.toBeUndefined()
  })
})
