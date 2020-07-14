module.exports = {
  schema: 'Screenshots',
  path: 'states/screenshots.{format}',
  tags: ['Internal Endpoints'],
  description: 'State website screenshots.',
  bucketDomain: 'covid-tracking-project-data.s3.us-east-1.amazonaws.com',
  urlPrefix: 'https://covidtracking.com/screenshots',
  prefix: 'state_screenshots',
  subDefinitions: [
    {
      key: 'stateScreenshots',
      schema: 'Screenshots',
      path: 'states/{state}/screenshots.{format}',
      tags: ['Internal Endpoints'],
      summary: 'Screenshot values for a single state',
      description: 'Single state website screenshots.',
      parameters: [
        {
          name: 'state',
          in: 'path',
          required: true,
          style: 'simple',
          explode: false,
          schema: {
            type: 'string',
            example: 'ca',
          },
          description:
            'Use the lower-case two-letter state code to select the current value for a single state.',
        },
      ],
    },
  ],
  fieldDefinitions: [
    {
      target: 'state',
      type: 'string',
      graphQlType: 'String',
      description: 'State abbreviation.',
      nullable: false,
      example: 'AK',
    },
    {
      target: 'url',
      type: 'string',
      graphQlType: 'String',
      description: 'URL of screenshot on covidtracking.com.',
      nullable: false,
    },
    {
      target: 'dateChecked',
      type: 'string',
      graphQlType: 'String',
      nullable: false,
    },
    {
      target: 'secondary',
      type: 'boolean',
      graphQlType: 'Boolean',
      graphQlType: 'String',
      nullable: false,
    },
    {
      target: 'tertiary',
      type: 'boolean',
      graphQlType: 'Boolean',
      graphQlType: 'String',
      nullable: false,
    },
    {
      target: 'date',
      type: 'string',
      graphQlType: 'String',
      nullable: false,
    },
    {
      target: 'size',
      type: 'number',
      graphQlType: 'Int',
      nullable: false,
    },
  ],
}
