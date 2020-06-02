# Build process

The entire API build process is outlined in the Github Actions workflow in `.github/workflows/build.yml`. [View a diagram of how this relates to website builds](https://docs.google.com/drawings/d/1E4xRA08c2d5eYcBQbvm-vfuAryqlm5fJiN11DXQbOYc/edit?usp=sharing)

1. Checkout this build repo
2. Checkout the current [public API repo](https://github.com/COVID19Tracking/covid-public-api)
3. Install node dependencies
4. Run `npm run build` to do the actual build. This outputs new API files to replace the ones cloned from the public API
5. Run `npm run test:post-build` to make sure that certain files are in the right place before proceeding
6. Use `git status` to see if there were any files that changed since the last API run. If so, send a webhook to the website to start a new build.
7. Commit changes to the public API repo and push

## Building API files

When you run `npm run build`, it:

1. Pulls all the config files from `./config.js` and `/config/sources`
2. Runs each source to fetch data. This can include getting Google Sheets data, APIs, or using our internal API
3. Map fields and values as defined in the config files
4. Use each source file's definitions to determine which files should be generated
5. Store the files (JSON or CSV) to the `./_api` directory
6. Build `openapi.json` and `schema.graphql` files and place in the `./_api` directory
7. Send a Slack webhook with the results of the run
