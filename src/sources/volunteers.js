const { WebClient } = require('@slack/web-api')
const mapFields = require('../utilities/map-fields')
const logger = require('../utilities/logger')
const reporter = require('../utilities/reporter')()

module.exports = (config) => {
  const { listUserField, fieldDefinitions } = config.sources.volunteers
  let allUsers = []
  const allVolunteers = []
  let currentVolunteer = 0

  const slackClient = new WebClient(
    global.SLACK_TOKEN || process.env.SLACK_TOKEN
  )

  const getUserProfiles = (users) => {
    logger.debug(
      `Fetching Slack user profile for ${users[currentVolunteer].id}: ${users[currentVolunteer].real_name}`
    )
    return slackClient.users.profile
      .get({
        user: users[currentVolunteer].id,
      })
      .then((response) => {
        if (response.profile && response.profile.fields) {
          const { fields } = response.profile
          if (
            listUserField.id in fields &&
            fields[listUserField.id].value === listUserField.value
          ) {
            const volunteer = mapFields(fieldDefinitions, fields)
            if (volunteer) {
              allVolunteers.push(volunteer)
            }
          }
        }
        currentVolunteer++
        if (typeof users[currentVolunteer] !== 'undefined') {
          return getUserProfiles(users)
        }
        return allVolunteers
      })
      .catch((error) => {
        logger.error(`Slack API error when fetching profile ${error}`)
        reporter.fail(`Slack API error ${error}`)
        process.exit(1)
      })
  }

  const getUsers = (cursor) => {
    logger.debug(`Fetching slack API with cursor ${cursor}`)
    return slackClient.users
      .list({ limit: 100, cursor: cursor })
      .then((response) => {
        if (!response.ok) {
          logger.error(`Slack API error`)
          throw new Error('Slack API error')
        }
        allUsers = allUsers.concat(response.members)
        if (response.response_metadata.next_cursor) {
          return getUsers(response.response_metadata.next_cursor)
        }
        return allUsers
      })
      .catch((error) => {
        logger.error(`Slack API error ${error}`)
        reporter.fail(`Slack API error when fetching user list ${error}`)
      })
  }

  return {
    getUsers,
    getUserProfiles,
    fetch: () => {
      return new Promise((resolve, reject) => {
        logger.info('Fetching volunteers from Slack')
        getUsers()
          .then((users) => getUserProfiles(users))
          .then((volunteers) => {
            reporter.addDataLine('Volunteers', volunteers.length)
            resolve({
              source: config.sources.volunteers,
              data: volunteers,
            })
          })
      })
    },
  }
}
