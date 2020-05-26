const { DateTime } = require('luxon')

module.exports = {
  schema: 'Press',
  path: 'internal/press.{format}',
  tags: ['Internal Endpoints'],
  description:
    'A list of news articles the COVID Tracking Project has appeared in.',
  sheetId: '17KJTUTRwh-2og9Kx0OIZ4Ix5dm_51TL330wwgYSfTBs',
  worksheetId: 0,
  fieldDefinitions: [
    {
      source: 'Title',
      target: 'title',
      type: 'string',
      graphQlType: 'String',
      description: 'Title of the article.',
      nullable: false,
      example: 'News from the COVID Tracking Project',
    },
    {
      source: 'URL',
      target: 'url',
      type: 'string',
      graphQlType: 'String',
      description: 'URL of the press article.',
      nullable: false,
    },
    {
      source: 'Add to COVID Tracking Project Website?',
      target: 'addToCovidTrackingProjectWebsite',
      format: (value) => value === 'TRUE',
      type: 'boolean',
      graphQlType: 'Boolean',
      description: 'Whether the article should be included on the website.',
      nullable: true,
    },
    {
      source: 'Publication',
      target: 'publication',
      type: 'string',
      graphQlType: 'String',
      description: 'Name of the publication.',
      nullable: false,
    },
    {
      source: 'Publish date',
      target: 'publicationDate',
      required: true,
      format: (value) =>
        DateTime.fromFormat(value, 'yyyy-mm-dd').toFormat('yyyy-mm-dd'),
      type: 'string',
      graphQlType: 'String',
      description: 'Date of publication.',
      nullable: false,
    },
  ],
}
