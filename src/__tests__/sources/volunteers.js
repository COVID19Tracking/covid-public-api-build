require('jest-fetch-mock').enableMocks()
const fs = require('fs-extra')
const config = require('../../__mocks__/config')
const { WebClient } = require('@slack/web-api')

const volunteerSource = require('../../sources/volunteers')

jest.mock('@slack/web-api', () => {
  const sampleUsers = require('../../__mocks__/sources/volunteers/users.json')
  const sampleProfiles = require('../../__mocks__/sources/volunteers/profiles.json')
  return {
    WebClient: jest.fn(() => ({
      users: {
        list: () => {
          return new Promise((resolve, reject) => {
            resolve({
              ok: 1,
              members: sampleUsers,
              response_metadata: {
                next_cursor: false,
              },
            })
          })
        },
        profile: {
          get: ({ user }) => {
            return new Promise((resolve, reject) => {
              resolve(sampleProfiles[user])
            })
          },
        },
      },
    })),
  }
})

describe('Sources: Volunteers', () => {
  it('fetches users from Slack', (done) => {
    const { getUsers } = volunteerSource(config)
    getUsers().then((response) => {
      expect(response).toHaveLength(1)
      done()
    })
  })

  it('fetches user profiles', (done) => {
    const { getUserProfiles } = volunteerSource(config)
    const users = [
      { id: 0, real_name: 'Do not list' },
      { id: 1, real_name: 'Do list' },
    ]
    getUserProfiles(users).then((response) => {
      expect(response).toHaveLength(1)
      done()
    })
  })
})
