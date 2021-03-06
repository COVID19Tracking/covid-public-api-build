module.exports = (config) => {
  const openApiDefinition = {
    ...config.openApiFrontmatter,
    paths: {},
    components: {
      schemas: {},
    },
  }

  const processSourcePath = (source) => {
    const content = {}
    const schema = {
      schema: {
        type: 'array',
        items: {
          $ref: `#/components/schemas/${source.schema}`,
        },
      },
    }
    content['application/json'] = schema
    content['text/csv'] = schema

    return {
      get: {
        tags: source.tags,
        summary: source.summary || source.description,
        description: source.description,
        'x-public-source-url': source.xPublicSourceUrl || false,
        responses: {
          200: {
            description: 'OK',
            content,
          },
        },
        parameters: source.parameters
          ? config.openApiBaseParameters.concat(source.parameters)
          : config.openApiBaseParameters,
      },
    }
  }

  const processSourceSchema = (source) => {
    const schema = {
      type: 'object',
      properties: {},
    }
    source.fieldDefinitions.forEach((field) => {
      schema.properties[field.target] = {
        type: field.type,
        description: field.description,
        nullable: field.nullable,
        example: field.example ? field.example : '',
      }
      if (typeof field.metadata !== 'undefined') {
        Object.keys(field.metadata).forEach((metadataField) => {
          schema.properties[field.target][`x-${metadataField}`] =
            field.metadata[metadataField]
        })
      }
    })
    return schema
  }

  const addSource = (source) => {
    openApiDefinition.paths[
      `${config.openApiPathPrefix}${source.path}`
    ] = processSourcePath(source)
    openApiDefinition.components.schemas[source.schema] = processSourceSchema(
      source
    )
    if (typeof source.subDefinitions !== 'undefined') {
      source.subDefinitions.forEach((definition) => {
        openApiDefinition.paths[
          `${config.openApiPathPrefix}${definition.path}`
        ] = processSourcePath(definition)
      })
    }
  }

  return {
    addSource,
    processSourcePath,
    processSourceSchema,
    getDefinition: () => {
      return openApiDefinition
    },
  }
}
