module.exports = {
  schema: 'Test',
  path: 'v1/test.{format}',
  tags: ['Test Endpoints'],
  description: 'A sample endpoint.',
  subDefinitions: [
    {
      schema: 'Test',
      path: 'v1/test2.{format}',
      tags: ['Test Endpoints 2'],
      description: 'A sample endpoint. 2',
    },
  ],
  fieldDefinitions: [
    {
      source: 'Title',
      target: 'title',
      type: 'string',
      graphQlType: 'String',
      description: 'Title of this.',
      nullable: false,
      example: 'An example',
    },
    {
      source: 'URL',
      target: 'url',
      type: 'string',
      graphQlType: 'String',
      description: 'URL of this.',
      nullable: false,
    },
    {
      source: 'Total',
      target: 'total',
      type: 'number',
      graphQlType: 'Int',
      description: 'Total number.',
      nullable: false,
    },
  ],
}
