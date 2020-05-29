require('jest-fetch-mock').enableMocks()
const fs = require('fs-extra')
const screenshotSource = require('../../sources/screenshots')
const config = require('../../__mocks__/config')
const spec = require('../../__mocks__/spec.json')
const sampleScreenshot = require('../../__mocks__/sources/screenshots/sample.json')

const sampleXml = fs
  .readFileSync('./src/__mocks__/sources/screenshots/screenshots.xml')
  .toString()

beforeEach(() => {
  fetchMock.doMock((request) => {
    return new Promise((resolve) => {
      if (request.url.search('&marker') > -1) {
        resolve(
          sampleXml.replace(
            '<IsTruncated>true</IsTruncated>',
            '<IsTruncated>false</IsTruncated>'
          )
        )
      }
      resolve(sampleXml)
    })
  })
})

const screenshotFormat = {
  state: expect.any(String),
  url: expect.any(String),
  secondary: expect.any(Boolean),
  dateChecked: expect.any(String),
  date: expect.any(String),
  size: expect.any(Number),
}

const splitName = (value) => value.split('.').shift().split('-')

describe('Sources : Screenshots', () => {
  it('detects if an object is a Screenshot', () => {
    const { isScreenshot } = screenshotSource(config)
    expect(
      isScreenshot({
        name: '1',
      })
    ).toBe(false)

    expect(
      isScreenshot({
        Size: 100,
        Key: 'something.png',
      })
    ).toBe(false)

    expect(
      isScreenshot({
        Size: 100,
        Key: 'state_screenshots/something.png',
      })
    ).toBe(true)
  })

  it('parses XML correctly', (done) => {
    const { parseXml } = screenshotSource(config)

    parseXml(sampleXml)
      .then((results) => {
        expect(results).toEqual(
          expect.objectContaining({
            ListBucketResult: expect.any(Object),
          })
        )

        expect(results.ListBucketResult).toEqual(
          expect.objectContaining({
            Contents: expect.any(Array),
          })
        )

        expect(results.ListBucketResult.Contents[0]).toEqual(
          expect.objectContaining({
            Key: expect.any(String),
            Size: expect.any(Number),
            ETag: expect.any(String),
            LastModified: expect.any(String),
            StorageClass: expect.any(String),
          })
        )

        done()
      })
      .catch((error) => {
        expect(error).toBe(false)
        done()
      })
  })

  it('parses screenshot states correctly', () => {
    const { formatScreenshotState } = screenshotSource(config)

    expect(formatScreenshotState(splitName('AK-20200315-021315.png'))).toBe(
      'AK'
    )
    expect(
      formatScreenshotState(splitName('AK-secondary-20200315-021315.png'))
    ).toBe('AK')
    expect(
      formatScreenshotState(splitName('AKsomething-20200315-021315.png'))
    ).toBe(false)
  })

  it('parses screenshot dates', () => {
    const { formatScreenshotDate } = screenshotSource(config)

    expect(
      formatScreenshotDate(splitName('AK-secondary-20200315-021315.png'))
        .setZone('America/New_York')
        .toFormat('D T')
    ).toBe('3/15/2020 02:13')
    expect(
      formatScreenshotDate(splitName('AK-20200315-021315.png'))
        .setZone('America/New_York')
        .toFormat('D T')
    ).toBe('3/15/2020 02:13')
    expect(
      formatScreenshotDate(splitName('AK-secondary-20200315-02.png')).isValid
    ).toBe(false)
    expect(formatScreenshotDate(splitName('AK-20200315-abc.png'))).toBe(false)
  })

  it('formats screenshots', () => {
    const { formatScreenshot } = screenshotSource(config)

    expect(formatScreenshot(sampleScreenshot.primary)).toEqual(
      expect.objectContaining(screenshotFormat)
    )
    expect(formatScreenshot(sampleScreenshot.secondary)).toEqual(
      expect.objectContaining(screenshotFormat)
    )
    expect(formatScreenshot(sampleScreenshot.invalid)).toBe(false)

    expect(formatScreenshot(sampleScreenshot.primary).secondary).toBe(false)
    expect(formatScreenshot(sampleScreenshot.secondary).secondary).toBe(true)
  })

  it('adds only screenshots that meet expected values', () => {
    const { getScreenshots, addScreenshot } = screenshotSource(config)

    expect(addScreenshot({ Key: 'random-thing.png' })).toBe(false)
    expect(getScreenshots()).toHaveLength(0)

    expect(addScreenshot(sampleScreenshot.primary)).toBeTruthy()
    expect(getScreenshots()).toHaveLength(1)
  })

  it('fetches screenshot data', (done) => {
    const { fetch } = screenshotSource(config)
    fetch().then((response) => {
      expect(response.data).toHaveLength(1998)
      expect(response.data[0]).toEqual(
        expect.objectContaining(screenshotFormat)
      )
      done()
    })
  })
})
