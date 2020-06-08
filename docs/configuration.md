# Configuration

All config values are stored in the `config.js` file in the root of this repo. For convenience, since they are quite long, that file fetches one config file for each data source from `/config/sources`.

## Global configuration

The top-level config values are:

- `outputPath` - Directory to output all API files to
- `openApiFrontmatter` - An object that defines the top-level content of the generated OpenAPI file. These are all placed in the [top level OpenAPI document](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#openapi-object)
- `openApiPathPrefix` - Prefix for API paths
- `openApiBaseParameters` - [Standard parameters](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#parameterObject) common to all API endpoints. This is currently our `{format}` parameter that lets users switch between JSON or CSV format.

## Source configuration

The `source` object in `config.js` is a list of datasources for the API. Each source includes:

- `schema` - A name to give the schema defined by this source. This is used by GraphQL and OpenAPI specs.
- `path` - The path to store the API files to. Use `{format}` instead of `.json` to write both JSON and CSV files. This should not include the defined `openApiPathPrefix`, so instead of `/api/v1/internal/press.json`, use `internal/press.{format}`.
- `tags` - An array of tags to categorize this source. Used in our API page.
- **additional configuration** - Some sources have additional values to store Worksheet IDs or API endpoints to fetch data from.
- `fieldDefinitions` - An array of field definitions. Used to map values from the source to our API output, and modify values.

### Field definitions

The `fieldDefinitions` array is a list of all fields that will be written to the API files. Each one should include:

- `source` - The key of the value from the source. If you are fetching records from a JSON endpoint, this would be the key, or for Spreadsheets the header row.
- `target` - The key for this field in our API.
- `type` - The [OpenAPI field type](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#dataTypes) for this field.
- `graphQlType` - The [GraphQL scalar type](https://graphql.org/learn/schema/#scalar-types) of this field.
- `desscription` - Description of this field for our API docs.
- `example` - An example of the field for our API docs.
- `nullable` - If `false`, this field is considered not required, and will be stored as `null` if not present. If `true`, then any record without this field **will not be included** in the API output.
- `format` - A function that is passed the value of the field, and should return a newly formatted version of the field. useful to change strings to integers, or reformat dates
- `sourceFunction` - A function that takes the entire record and returns a value. If this is set, then **the source field** is ignored. This is useful to reutrn the sum of two different fields, or to return a static value.
