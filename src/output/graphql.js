const { schemaComposer } = require('graphql-compose')

module.exports = (config) => {
  const specs = []
  const addDefinition = (spec) => {
    const fields = {}

    specs.push(`Type ${spec.schema} {`)

    spec.fieldDefinitions.forEach((field) => {
      fields[field.target] = field.graphQlType
      specs.push(`  ${field.target}: ${field.graphQlType}`)
    })

    schemaComposer.createObjectTC({
      name: spec.schema,
      fields: fields,
    })
    specs.push(`}\n`)
  }

  return {
    addDefinition,
    getSdl: () => {
      return specs.join('\n')
    },
  }
}
