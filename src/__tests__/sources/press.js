require('jest-fetch-mock').enableMocks()
const fs = require('fs-extra')
const config = require('../../__mocks__/config')
const spec = require('../../__mocks__/spec.json')
const { GoogleSpreadsheet } = require('google-spreadsheet')

const pressSource = require('../../sources/press')

const sampleArticle = {
  Title: 'Test title',
  URL: 'https://example.com',
  'Add to COVID Tracking Project Website?': 'TRUE',
  Publication: 'Publication A',
  'Publish date': '',
}

jest.mock('google-spreadsheet', () => ({
  GoogleSpreadsheet: jest.fn(() => ({
    useApiKey: () => {},
    loadInfo: () => {
      return new Promise((resolve) => {
        resolve([])
      })
    },
    sheetsById: [
      {
        getRows: () => {
          return new Promise((resolve) => {
            resolve([
              {
                Title: 'Test title',
                URL: 'https://example.com',
                'Add to COVID Tracking Project Website?': 'TRUE',
                Publication: 'Publication A',
                'Publish date': '',
              },
            ])
          })
        },
      },
    ],
  })),
}))

describe('Sources: Press', () => {
  it('maps fields', () => {
    const { formatData } = pressSource(config)

    expect(formatData([sampleArticle]).pop().title).toBe('Test title')
    expect(formatData([{ test: 'something' }])).toHaveLength(0)
  })

  it('fetches data', (done) => {
    const { fetch } = pressSource(config)
    fetch().then((response) => {
      expect(response.data).toHaveLength(1)
      expect(response.data.pop().title).toBe('Test title')
      done()
    })
  })
})
