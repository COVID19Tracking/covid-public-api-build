module.exports = {
  schema: 'Volunteers',
  path: 'internal/volunteers.{format}',
  tags: ['Internal Endpoints'],
  description: 'A list of volunteers who opted in to be listed on the website.',
  listUserField: {
    id: 'Xf011X160CGK',
    value: 'Yes, add me to the public volunteer web page',
  },
  fieldDefinitions: [
    {
      source: 'Xf0122V6KCN8',
      target: 'name',
      type: 'string',
      graphQlType: 'String',
      description: 'Name of volunteer.',
      nullable: false,
      example: 'bell hooks',
      format: (value) => value.value,
    },
    {
      source: 'Xf0129DFHP4Z',
      target: 'website',
      type: 'string',
      graphQlType: 'String',
      description: "URL of the volunteer's website.",
      nullable: true,
      format: (value) => value.value,
    },
  ],
}
