const logger = require('../utilities/logger')
const reporter = require('../utilities/reporter')()
const fetch = require('node-fetch')
const parser = require('fast-xml-parser')
const { DateTime } = require('luxon')

module.exports = (config) => {
  const { bucketDomain, prefix, urlPrefix } = config.sources.screenshots
  const screenshots = []

  const parseXml = (xmlText) => {
    return new Promise((resolve, reject) => {
      try {
        resolve(parser.parse(xmlText, true))
      } catch (err) {
        reject(err)
      }
    })
  }

  const isScreenshot = (screenshot) => {
    if (
      typeof screenshot.Size === 'undefined' ||
      typeof screenshot.Key === 'undefined'
    ) {
      return false
    }
    return screenshot.Size > 0 && screenshot.Key.search(`${prefix}/`) === 0
  }

  const formatScreenshotDate = (nameSplit, format) => {
    const time = nameSplit.pop()
    const day = nameSplit.pop()
    if (isNaN(time) || isNaN(day)) {
      logger.debug(`Time format was wrong for ${name}`)
      return false
    }
    const date = DateTime.fromFormat(day + time, 'yyyyLLddHHmmss', {
      zone: 'America/New_York',
    })

    return date.setZone('UTC')
  }

  const formatScreenshotState = (nameSplit) => {
    const state = nameSplit.shift()
    if (state.length !== 2) {
      logger.debug(`Could not find state in ${nameSplit.join('-')}`)
      return false
    }
    return state
  }

  const isValidScreenshotName = (nameSplit) => {
    if (nameSplit.length < 3 || nameSplit.length > 4) {
      logger.debug(`File name invalid ${nameSplit.join('-')}`)
      return false
    }
    if (
      nameSplit.length === 4 &&
      ['secondary', 'tertiary'].indexOf(nameSplit[1]) === -1
    ) {
      logger.debug(
        `File second position not secondary or tertiary label in ${nameSplit.join(
          '-'
        )}`
      )
      return false
    }
    return true
  }

  const formatScreenshot = (screenshot) => {
    const url = screenshot.Key.split('/')
    const fileName = url.pop()
    const nameSplit = fileName.split('.').shift().split('-')
    const isSecondary = nameSplit[1] === 'secondary'
    const isTertiary = nameSplit[1] === 'tertiary'
    if (!isValidScreenshotName(nameSplit)) {
      return false
    }
    const date = formatScreenshotDate(nameSplit)
    const state = formatScreenshotState(nameSplit)
    const result = {
      state,
      url: `${urlPrefix}/${state}/${fileName}`,
      secondary: isSecondary,
      tertiary: isTertiary,
      dateChecked: date.toISO(),
      date: date.toFormat('yyyyLLdd'),
      size: screenshot.Size,
    }
    if (!result.state || !result.dateChecked || !result.date) {
      return false
    }
    return result
  }

  const addScreenshot = (screenshot) => {
    if (!isScreenshot(screenshot)) {
      return false
    }
    const formattedScreenshot = formatScreenshot(screenshot)
    if (formattedScreenshot) {
      screenshots.push(formattedScreenshot)
      return formattedScreenshot
    }
    return false
  }

  const getScreenshots = (bucketDomain, marker = false) => {
    const url = `https://${bucketDomain}?prefix=${prefix}${
      marker ? `&marker=${marker}` : ''
    }`
    logger.debug(`Fetching ${url}`)
    return fetch(url)
      .then((response) => response.text())
      .then((data) => parseXml(data))
      .then(({ ListBucketResult }) => {
        if (!ListBucketResult) {
          return screenshots
        }
        ListBucketResult.Contents.forEach((screenshot) => {
          addScreenshot(screenshot)
        })
        if (ListBucketResult.IsTruncated) {
          return getScreenshots(
            bucketDomain,
            ListBucketResult.Contents[ListBucketResult.Contents.length - 1].Key
          )
        }
        return screenshots
      })
  }

  const stateScreenshots = (data, definition, writeFile) => {
    const states = {}
    data.forEach((row) => {
      if (typeof states[row.state] === 'undefined') {
        states[row.state] = []
      }
      states[row.state].push(row)
    })
    Object.keys(states).forEach((state) => {
      writeFile(
        definition.path.replace('{state}', state.toLowerCase()),
        states[state]
      )
    })
  }

  return {
    parseXml,
    isScreenshot,
    addScreenshot,
    formatScreenshot,
    formatScreenshotDate,
    formatScreenshotState,
    getScreenshots,
    stateScreenshots,
    getScreenshots: () => {
      return screenshots
    },

    fetch: () => {
      return new Promise((resolve, reject) => {
        logger.info('Fetching screenshots')
        getScreenshots(bucketDomain).then((data) => {
          reporter.addDataLine('Screenshots', data.length)
          logger.info(`Fetched ${data.length} screenshots`)
          resolve({
            source: config.sources.screenshots,
            data: data,
            subDefinitionOutput: { stateScreenshots },
          })
        })
      })
    },
  }
}
