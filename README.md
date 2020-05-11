[![CircleCI](https://circleci.com/gh/COVID19Tracking/covid-public-api-build.svg?style=svg)](https://circleci.com/gh/COVID19Tracking/covid-public-api-build) [![Coverage Status](https://coveralls.io/repos/github/COVID19Tracking/covid-public-api-build/badge.svg?branch=master)](https://coveralls.io/github/COVID19Tracking/covid-public-api-build?branch=master) ![API build](https://github.com/COVID19Tracking/covid-public-api-build/workflows/API%20build/badge.svg)

# Public API builder

This is a Node.js application that builds the static files that powers the [COVID Tracking Project API](https://covidtracking.com/api/). It is build to be run on Github Actions, but can be run anywhere.

In production, it writes files to the [COVID Tracking public API repository](https://github.com/COVID19Tracking/covid-public-api).

The design principles of this project are:

- **Data quality** - Fail the build on any chance that data is incorrect. It is better to have stale data than wrong data.
- **Testability** - Code should have total coverage, and data integrity should be completely testable during and after a build.
- **Maintainability** - Opt for clear, concise patterns. Opt for code that is clearly structured over performance.
- **Configuration** - Keep all configuration values in a central location.

## Defined sources

The API currently provides the following sources:

### External & Public

These are listed public endpoints:

- `states-info` - Metadata about individual states
- `states` - Historic and current data per state
- `us` - Historic and current data on the country

### Internal

These are public, but are intended only for use by the project website:

- `cdc-tests` - A list of CDC public test results
- `press` - Articles that mention or use data from the COVID Tracking Project
- `screnshots` - Screenshot files of different state's COVID websites.
- `volunteers` - Volunteers who opted to list themselves on the website via Slack.

## OpenAPI, Swagger, and GraphQL output

The project outputs an `openapi.json` file and a `schema.graphql` file for integrating with Swagger for documentation, and building a GraphQL server.

## Development

### Setting up

Once you have downloaded the repository, run `npm install` to install dependencies.

### Environment variables

- `COVID_API_DEBUG` - Set to true to log all debug-level items to the console
- `GOOGLE_API_KEY` - A Google API token with access to read Google spreadsheets
- `SLACK_TOKEN` - A Slack token with access to `users.profile:read` and `users:read` scopes.

### Testing

The project uses Jest and a lot of mocks for `node-fetch`. To run, use: `npm run test`

### Configuration

All configuration options are stored in `config.js`.

### Command line arguments

To do a partial run, use the command line arguments:

- `--source [name]` - Only runs a single source name
- `--clean` - Remove all files from the output directory
